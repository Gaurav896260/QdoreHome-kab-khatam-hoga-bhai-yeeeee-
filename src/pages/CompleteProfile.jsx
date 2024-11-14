import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/slices/authSlice";
import Footer from "../components/Footer/Footer.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";

const CompleteProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem("userInfo")));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const userData = {
      username: username,
      mobile: user?.phone,
      email: email,
      password: password,
      fbUserId: user?._id,
      token: user?.token,
    };

    try {
      const response = await axios.post(
        "https://qdore-backend-final-final-last.vercel.app/api/users/",
        userData
      );

      const userResponse = await axios
        .get(
          `https://qdore-backend-final-final-last.vercel.app/api/users/phone/${encodeURIComponent(
            user?.phone
          )}`
        )
        .catch((error) => {
          if (error.response?.status === 404) {
            return { data: { user: null } };
          }
          throw error;
        });

      const userDataResponse = userResponse.data?.user;
      const token = await generateToken(userDataResponse._id);

      dispatch(
        setCredentials({
          user: response.data.user,
          token: token,
        })
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          ...response.data.user,
          token: token,
        })
      );

      localStorage.setItem("isRegistrationCompleteViaPhone", "true");

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(
        "Error saving user profile:",
        error.response?.data || error
      );
      setError("Failed to save profile. Please try again.");
      localStorage.setItem("isRegistrationCompleteViaPhone", "false");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome to Qdore
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Complete your profile to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Full Name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 text-lg font-medium"
            >
              {isLoading ? (
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
              ) : (
                "Complete Profile"
              )}
            </button>
          </form>
        </div>

        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block align-bottom bg-white rounded-2xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-green-100 to-green-200 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Profile Completed Successfully!
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please sign in again to access your account. Redirecting
                        you shortly...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CompleteProfile;
