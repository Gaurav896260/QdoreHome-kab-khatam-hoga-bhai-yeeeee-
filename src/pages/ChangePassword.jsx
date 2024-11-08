import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  auth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../../backend/controllers/firebaseController.js";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import parsePhoneNumber, { isValidNumber } from "libphonenumber-js"; // For phone number validation

const ChangePasswordWithOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [step, setStep] = useState("phone"); // "phone" -> "otp" -> "password"
  const [error, setError] = useState("");
  const recaptchaVerifierRef = useRef(null);

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
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    if (!formattedPhoneNumber) {
      setError("Invalid phone number. Please try again.");
      return;
    }

    try {
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
  };

  const verifyOTP = async () => {
    if (!confirmResult) {
      setError("No OTP confirmation available. Please try again.");
      return;
    }

    try {
      const result = await confirmResult.confirm(verificationCode);
      const accessToken = await result.user.getIdToken();
      const { uid } = result.user;

      toast.success("Phone number verified successfully!");
      setStep("password"); // Move to password change step after OTP verification
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `https://qdore-backend-final-final-last.vercel.app/api/users/change-password/${userInfo._id}`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response.data) {
        toast.success("Password changed successfully");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {step === "phone" && (
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify Phone Number
            </h2>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-4 w-full px-3 py-2 border"
            />
            <button
              className="w-full bg-gray-900 text-white mt-4 py-2"
              onClick={handlePhoneSubmit}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enter OTP
            </h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-4 w-full px-3 py-2 border"
            />
            <button
              className="w-full bg-gray-900 text-white mt-4 py-2"
              onClick={verifyOTP}
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === "password" && (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handlePasswordSubmit}>
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border"
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border bg-gray-900 text-white"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastContainer position="bottom-right" />
      <div id="recaptcha-container"></div>
    </>
  );
};

export default ChangePasswordWithOTP;