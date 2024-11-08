import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  auth,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "../../backend/controllers/firebaseController.js";
import { parsePhoneNumber, isValidNumber } from "libphonenumber-js";
import { setCredentials } from "../redux/slices/authSlice";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { PhoneIcon, EyeIcon, EyeOffIcon, Mail } from "lucide-react";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [countryCode, setCountryCode] = useState("in");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaVerifierRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    initializeRecaptcha();
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const initializeRecaptcha = () => {
    if (!recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA solved successfully.");
            },
            "expired-callback": () => {
              initializeRecaptcha();
            },
          }
        );
      } catch (error) {
        console.error("Error initializing RecaptchaVerifier:", error);
      }
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      try {
        const phoneNumberParsed = parsePhoneNumber(phoneNumber, "IN");
        const newCountryCode =
          phoneNumberParsed?.country?.toLowerCase() || "us";
        setCountryCode(newCountryCode);
      } catch (error) {
        console.error("Error parsing phone number:", error);
        setCountryCode("us");
      }
    }
  }, [phoneNumber]);

  const formatPhoneNumber = (number) => {
    try {
      if (number.length < 10) return null;
      const phoneNumberParsed = parsePhoneNumber(number, "IN");
      const validNumber = isValidNumber(phoneNumberParsed.number);
      return validNumber ? phoneNumberParsed.number : null;
    } catch (error) {
      console.error("Error formatting phone number:", error);
      return null;
    }
  };

  const generateToken = async (userId) => {
    try {
      const tokenResponse = await axios.post(
        "https://qdore-backend-final-final-last.vercel.app/api/users/auth/token",
        { userId }
      );

      if (tokenResponse.data && tokenResponse.data.token) {
        return tokenResponse.data.token;
      } else {
        throw new Error("Token generation failed: No token returned");
      }
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAuthAction = async () => {
    setIsLoading(true);
    setError("");
    try {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      if (!formattedPhoneNumber) {
        throw new Error("Invalid phone number");
      }

      const response = await axios.get(
        `https://qdore-backend-final-final-last.vercel.app/api/users/phone/${encodeURIComponent(
          formattedPhoneNumber
        )}`
      );

      const userData = response.data?.user;
      const phoneExists = !!userData;

      if (phoneExists) {
        if (!password) {
          setShowPassword(true);
          return;
        }

        const verifyResponse = await axios.post(
          `https://qdore-backend-final-final-last.vercel.app/api/users/auth/verifyPassword`,
          {
            phone: formattedPhoneNumber,
            password: password.trim(),
          }
        );

        if (verifyResponse.data.isValid) {
          const token = await generateToken(userData._id);
          const userInfo = { ...userData, token };
          dispatch(setCredentials(userInfo));
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          navigate("/");
        } else {
          throw new Error("Incorrect password");
        }
      } else {
        if (!recaptchaVerifierRef.current) {
          await initializeRecaptcha();
          if (!recaptchaVerifierRef.current) {
            throw new Error("Failed to initialize reCAPTCHA");
          }
        }

        const appVerifier = recaptchaVerifierRef.current;
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          formattedPhoneNumber,
          appVerifier
        );
        setConfirmResult(confirmationResult);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setError(error.message || "An error occurred during authentication");
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
      await initializeRecaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!confirmResult) {
      setError("No confirmation result available");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const result = await confirmResult.confirm(verificationCode);
      const accessToken = await result.user.getIdToken();
      const { uid } = result.user;
      const userInfo = {
        _id: uid,
        displayName: null,
        phone: result.user.phoneNumber,
        token: accessToken,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/completeProfile", { state: { user: userInfo } });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { uid, displayName, email } = result.user;

      if (!uid || !email) {
        throw new Error("User ID or email is missing.");
      }

      const accessToken = await result.user.getIdToken();

      try {
        const response = await axios.get(
          `https://qdore-backend-final-final-last.vercel.app/api/users/email/${encodeURIComponent(
            email
          )}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.data && response.data.user) {
          // Existing user
          dispatch(
            setCredentials({ ...response.data.user, token: accessToken })
          );
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ ...response.data.user, token: accessToken })
          );
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // New user
          const userInfo = {
            _id: uid,
            displayName: displayName || "User",
            email,
            token: accessToken,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          navigate("/addPhone", { state: { user: userInfo } });
        } else {
          // Unexpected error
          throw error;
        }
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setError("An error occurred during Google Sign-In. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 mt-20 mb-20">
          <h2 className="text-3xl font-bold font-roboto text-center text-gray-900 mb-6">
            SIGN IN/UP YOUR ACCOUNT
          </h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-2xl font-medium font-roboto text-gray-800 mb-4"
              >
                Phone Number
              </label>
              <div className="flex">
                <div className="w-16 flex items-center justify-center bg-gray-200 border border-gray-300 border-r-0 rounded-l-md">
                  <img
                    src={`https://flagcdn.com/w20/${countryCode}.png`}
                    alt="Country flag"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://flagcdn.com/w20/in.png";
                    }}
                    className="w-10 h-8"
                  />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="flex-1 block w-full rounded-r-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 text-lg"
                  placeholder="Enter your phone number here"
                />
              </div>
            </div>
            {showPassword && (
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pr-10 border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            )}
            {confirmResult && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
            )}
            <button
              onClick={confirmResult ? verifyOTP : handleAuthAction}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : confirmResult
                ? "Verify OTP"
                : showPassword
                ? "Login"
                : "Continue"}
            </button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Mail className="h-5 w-5 mr-2" />
                Sign in with Google
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm">
            <Link
              to="/forgotpassword"
              className="font-medium text-gray-600 hover:text-gray-500"
            >
              Forgot Password?
            </Link>
            
          </div>
        </div>
      </main>
      {error && (
        <div
          className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div id="recaptcha-container" className="hidden"></div>
      <Footer />
    </div>
    </>
  );
};

export default Auth;