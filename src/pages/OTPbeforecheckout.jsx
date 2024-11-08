import React, { useState, useEffect, useRef } from "react";
import {
  auth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../../backend/controllers/firebaseController.js";
import { parsePhoneNumber, isValidNumber } from "libphonenumber-js";
import { useNavigate, useLocation } from "react-router-dom";

import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

const OTPVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [step, setStep] = useState("phone");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaVerifierRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handlePhoneSubmit = async () => {
    setError("");
    setIsLoading(true);
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    if (!formattedPhoneNumber) {
      setError("Invalid phone number. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
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
      setStep("otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
      await initializeRecaptcha();
    }
    setIsLoading(false);
  };

  const verifyOTP = async () => {
    if (!confirmResult) {
      setError("No OTP confirmation available. Please try again.");
      return;
    }

    setIsLoading(true);
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

      if (location.state && location.state.redirectTo) {
        navigate(location.state.redirectTo, { state: { fromOTP: true } });
      } else {
        navigate("/completeProfile", { state: { user: userInfo } });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center font-sans">
        <div className="max-w-[300px] w-full bg-white p-8 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Phone Verification
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            {step === "phone"
              ? "Enter your phone number to receive a verification code"
              : "Enter the 6-digit code sent to your phone"}
          </p>
          {error && (
            <div className="text-red-600 mb-4 text-center">{error}</div>
          )}
          {step === "phone" ? (
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-3 py-3 text-lg border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              />
              <button
                onClick={handlePhoneSubmit}
                disabled={isLoading}
                className={`w-full py-3 text-base font-bold text-white bg-black rounded-md relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span
                  className={`inline-block transition-all duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Send Verification Code
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-3 py-3 text-lg border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
              />
              <button
                onClick={verifyOTP}
                disabled={isLoading}
                className={`w-full py-3 text-base font-bold text-white bg-black rounded-md relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span
                  className={`inline-block transition-all duration-300 ${
                    isLoading ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Verify OTP
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          )}
          <p className="mt-4 text-sm text-green-600 text-center font-bold">
            Please verify your phone number before proceeding to checkout.
          </p>
        </div>
        <div id="recaptcha-container"></div>
      </div>
      <Footer />
    </>
  );
};

export default OTPVerification;
