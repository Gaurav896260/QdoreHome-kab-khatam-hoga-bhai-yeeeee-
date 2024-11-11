import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Check, CreditCard, Truck, Plus, Trash2 } from "lucide-react";
import OrderConfirmationModal from "./BuyNowmodal";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { parsePhoneNumber, isValidNumber } from "libphonenumber-js";
import {
  auth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "../../backend/controllers/firebaseController.js";

const Checko = () => {
  const [currentTab, setCurrentTab] = useState("contact");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isRegistrationComplete = localStorage.getItem("registrationComplete");
  const isRegistrationCompleteViaPhone = localStorage.getItem(
    "isRegistrationCompleteViaPhone"
  );
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state || {};
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [step, setStep] = useState("phone");
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaVerifierRef = useRef(null);
  const [isOTPSent, setIsOTPSent] = useState(false); // To track if OTP has been sent
  const [otpVerified, setOtpVerified] = useState(false); // To track if OTP has been verified
  const [otp, setOtp] = useState("");
  const [isContactVerified, setIsContactVerified] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  // Add new useEffect to check phone verification status
  useEffect(() => {
    const checkPhoneVerification = () => {
      console.log(isRegistrationCompleteViaPhone);
      // If registration is complete via phone, set phone as verified and move to address tab
      if (isRegistrationCompleteViaPhone == "true") {
        setIsPhoneVerified(true);
        setIsContactVerified(true);
        setCurrentTab("address");
        return;
      }
    };
    checkPhoneVerification();
  }, [isRegistrationCompleteViaPhone]);

  // Combined useEffect for initial setup
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

      const initializeCheckout = async () => {
        if (userInfo && userInfo._id) {
          await fetchUserDetails(userInfo._id);
        }
        await fetchCart();
        await loadRazorpayScript();

        if (userInfo?.mobile) {
          setPhoneNumber(userInfo.mobile.replace(/^(\+91|91)/, ""));
        }
      };

      initializeCheckout();
    }
  }, []); // Empty dependency array as this should only run once on mount

  // Separate useEffect for Recaptcha initialization
  useEffect(() => {
    initializeRecaptcha();

    // Cleanup function
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []); // E

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
  // Modified handlePhoneSubmit
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
      setIsOTPSent(true);
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
  // Function to handle OTP verification success
  const handleOtpVerificationSuccess = () => {
    setOtpVerified(true);
    setIsContactVerified(true);
    setTimeout(() => {
      setCurrentTab("address");
    }, 1000);
  };

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
    setIsAddressSelected(true);
    setTimeout(() => {
      setCurrentTab("payment");
    }, 500);
  };

  // Modified verifyOTP to update user's phone verification status
  const verifyOTP = async () => {
    if (!confirmResult) {
      setError("No OTP confirmation available. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await confirmResult.confirm(otp);
      const accessToken = await result.user.getIdToken();

      // Update user's phone verification status in localStorage
      const updatedUserInfo = {
        ...userInfo,
        phoneVerified: true,
        phone: result.user.phoneNumber,
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      setIsPhoneVerified(true);
      handleOtpVerificationSuccess();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded successfully");
    script.onerror = () =>
      setError("Failed to load Razorpay. Please try again later.");
    document.body.appendChild(script);
  };

  const fetchUserData = async () => {
    // Check if userInfo exists and has a valid fbUserId
    if (!userInfo || !userInfo.fbUserId) {
      console.error("User info or fbUserId is missing");
      setError("User info or fbUserId is missing");
      return null;
    }

    console.log("Fetching user data for fbUserId:", userInfo.fbUserId);

    try {
      const response = await fetch(
        `https://qdore-backend-final-final-last.vercel.app/api/users/objectIdexport?fbUserId=${userInfo.fbUserId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Log the status code to debug potential API issues
      console.log("API Response Status:", response.status);

      if (!response.ok) {
        const errorMsg = `Failed to fetch user data: ${response.status} ${response.statusText}`;
        console.error(errorMsg);
        setError(errorMsg);
        return null;
      }

      const data = await response.json();
      console.log("User data fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data: " + error.message);
      return null;
    }
  };
  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `https://qdore-backend-final-final-last.vercel.app/api/users/user-details/${userId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      const userData = response.data;
      setUserDetails(userData);
      setAddresses(userData.addresses || []);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to load user details");
      throw error;
    }
  };
  const fetchCart = async () => {
    const userData = await fetchUserData();
    if (!userData || !userData._id) {
      toast.error("Failed to fetch user information.");
      return;
    }
    const mongoUserId = userData._id;
    try {
      const response = await fetch(
        `https://qdore-backend-final-final-last.vercel.app/api/cart/${mongoUserId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const data = await response.json();
      console.log("Fetched cart data:", data);

      if (!data || !data.products) {
        throw new Error("Cart not found for the user");
      }

      setCart(data.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Error fetching cart: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setNewAddress((prevState) => ({ ...prevState, pincode }));

    if (pincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const postOfficeData = response.data[0]?.PostOffice[0];
        if (postOfficeData) {
          setNewAddress((prevState) => ({
            ...prevState,
            state: postOfficeData.State,
            city: postOfficeData.District,
          }));
        } else {
          console.error("No data found for this pincode");
        }
      } catch (error) {
        console.error("Error fetching pincode details:", error);
      }
    }
  };

  const handleSaveAddress = async () => {
    try {
      const response = await fetch(
        "https://qdore-backend-final-final-last.vercel.app/api/users/save-address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({
            userEmail: userInfo.email,
            address: newAddress,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error saving address:", errorData);
        throw new Error("Failed to save address.");
      }
      const data = await response.json();
      if (!data.address) {
        console.error("No address returned from server.");
        throw new Error("No address returned from server.");
      }

      fetchUserDetails(userInfo._id);
      toast.success("Address saved successfully.");
      setShowForm(false);
      setNewAddress({
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
      });
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = userInfo.token;
      await axios.delete(
        `https://qdore-backend-final-final-last.vercel.app/api/users/delete-address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Address deleted successfully.");
      fetchUserDetails(userInfo._id);
    } catch (error) {
      toast.error("Failed to delete address.");
      console.error("Error deleting address:", error);
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const clearCart = async (mongoUserId) => {
    try {
      const response = await fetch(
        `https://qdore-backend-final-final-last.vercel.app/api/cart/${mongoUserId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart. Please try again.");
    }
  };

  const handleOrder = async () => {
    setIsProcessingPayment(true);
    setError(null);

    const userData = await fetchUserData();
    if (!userData || !userData._id) {
      toast.error("Failed to fetch user information.");
      setIsProcessingPayment(false);
      return;
    }

    const mongoUserId = userData._id;

    // Helper function to send confirmation email
    const sendConfirmationEmail = async (orderData, paymentMethod) => {
      try {
        const response = await fetch(
          "https://qdore-backend-final-final-last.vercel.app/api/send-email/confirmationemail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userInfo.email,
              username: userInfo.username,
              address: `${selectedAddress.line1}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.postalCode}`,
              amount: orderData.amount,
              paymentMethod: paymentMethod,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send confirmation email");
        }
      } catch (error) {
        console.error("Error sending confirmation email:", error);
        // Don't throw error here, just log it since email sending is not critical
      }
    };

    if (paymentMethod === "cod") {
      try {
        const orderdata = {
          userId: mongoUserId,
          address: selectedAddress,
          items: cart,
          paymentMethod: "Cash on Delivery",
          amount: totalPrice,
        };

        const orderResponse = await fetch(
          "https://qdore-backend-final-final-last.vercel.app/api/users/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify(orderdata),
          }
        );

        if (!orderResponse.ok) {
          const errorData = await orderResponse.json();
          throw new Error(`Failed to save order: ${errorData.message}`);
        }

        const orderData = await orderResponse.json();
        localStorage.setItem("orderDetails", JSON.stringify(orderData));
        setOrderDetails(orderData);

        // Send confirmation email for COD
        await sendConfirmationEmail(orderData, "Cash on Delivery");
        localStorage.removeItem("isRegistrationCompleteViaPhone");

        setIsModalOpen(true);
        await clearCart(mongoUserId);

        setSuccessMessage(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error saving order:", error);
        setError("Error saving order: " + error.message);
      } finally {
        setIsProcessingPayment(false);
      }
      return;
    }

    // Rest of the code from previous response

    // Online Payment Flow using Razorpay
    try {
      const options = {
        key: "rzp_live_p1es1jMXE5rpo5",
        amount: Math.round(totalPrice * 100),
        currency: "INR",
        name: "Qdore Home",
        description: "Order Transaction",
        handler: async function (response) {
          try {
            const orderdata = {
              userId: mongoUserId,
              address: selectedAddress,
              items: cart,
              paymentId: response.razorpay_payment_id,
              paymentMethod: "Online Payment",
              amount: totalPrice,
            };

            const orderResponse = await fetch(
              "https://qdore-backend-final-final-last.vercel.app/api/users/orders",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userInfo.token}`,
                },
                body: JSON.stringify(orderdata),
              }
            );

            if (!orderResponse.ok) {
              const errorData = await orderResponse.json();
              throw new Error(`Failed to save order: ${errorData.message}`);
            }

            const orderData = await orderResponse.json();
            localStorage.setItem("orderDetails", JSON.stringify(orderData));
            setOrderDetails(orderData);

            // Send confirmation email for online payment
            await sendConfirmationEmail(orderData, "Online Payment");
            localStorage.removeItem("isRegistrationCompleteViaPhone");
            setIsModalOpen(true);
            await clearCart(mongoUserId);
            setSuccessMessage(true);
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } catch (error) {
            console.error("Error saving order:", error);
            setError("Error saving order: " + error.message);
          }
        },
        prefill: {
          name: userInfo?.username || "",
          email: userInfo?.email || "",
          contact: userInfo?.mobile || "",
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        setError(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Error processing payment: " + error.message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // const handleChangeAddress = () => {
  //   navigate("/orderAddress");
  // };

  // const getImageUrl = (ipfsHash) => {
  //   return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  // Update renderContent function
  const renderContent = () => {
    // Only show phone verification if user is logged in or just completed registration
    if (currentTab === "contact" && !isPhoneVerified) {
      return (
        <div className="transform transition-all duration-500 ease-out animate-fadeIn">
          <h3 className="text-xl font-bold mb-4">
            {isOTPSent ? "Enter OTP" : "Enter Mobile Number"}
          </h3>

          {!isOTPSent && (
            <div className="flex items-center border rounded-lg p-3 mb-6 hover:border-blue-500 transition duration-300">
              <input
                type="text"
                className="flex-1 outline-none"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}

          {isOTPSent && (
            <div className="flex items-center border rounded-lg p-3 mb-6 hover:border-blue-500 transition duration-300">
              <input
                type="text"
                className="flex-1 outline-none"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <button
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            onClick={isOTPSent ? verifyOTP : handlePhoneSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isOTPSent ? "Verify OTP" : "Get OTP"}
            <span className="ml-2">{isLoading ? "" : "→"}</span>
          </button>

          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      );
    }
    return null;
  };
  // Render function
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
            <div className="lg:flex">
              {/* Left Container: Order Summary */}
              <div className="lg:w-1/3 bg-black p-8 text-white">
                <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
                  Order Summary
                </h2>
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center transform transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-400">
                          {item.quantity} x ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4">
                  <p className="text-2xl font-medium">
                    Total: ₹{totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
              {/* Right Container: Checkout Process */}
              <div className="lg:w-2/3 p-8">
                {/* Progress Steps */}
                <div className="flex justify-around mb-8">
                  {["contact", "address", "payment"].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${
                            currentTab === step
                              ? "bg-black text-white"
                              : index <
                                ["contact", "address", "payment"].indexOf(
                                  currentTab
                                )
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          } transition-all duration-300`}
                      >
                        {index <
                        ["contact", "address", "payment"].indexOf(
                          currentTab
                        ) ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < 2 && (
                        <div
                          className={`w-24 h-0.5 mx-2 
                            ${
                              index <
                              ["contact", "address", "payment"].indexOf(
                                currentTab
                              )
                                ? "bg-green-500"
                                : "bg-gray-200"
                            } transition-all duration-300`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {/* Tab Content for Contact */}
                <div id="recaptcha-container"></div>
                <div className="mt-8 transition-all duration-500">
                  {renderContent()}
                </div>
                {currentTab === "address" && isContactVerified && (
                  <div className="transform transition-all duration-500 ease-out animate-fadeIn">
                    <h3 className="text-lg font-bold mb-4">Address Details</h3>
                    {/* Add address form or saved addresses */}
                    {addresses.length > 0 ? (
                      <div className="space-y-4">
                        {addresses.map((address) => (
                          <div
                            key={address._id}
                            className={`border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                              selectedAddress &&
                              selectedAddress._id === address._id
                                ? "border-black bg-gray-50"
                                : "border-gray-200 hover:border-gray-400"
                            }`}
                            onClick={() => handleAddressSelection(address)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-start">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedAddress &&
                                    selectedAddress._id === address._id
                                  }
                                  onChange={() => setSelectedAddress(address)}
                                  className="mr-3 h-12 w-5 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <div>
                                  <p className="font-semibold font-roboto text-gray-800">
                                    {address.addressLine1}
                                  </p>
                                  {address.addressLine2 && (
                                    <p className="font-semibold font-roboto text-gray-800">
                                      {address.addressLine2}
                                    </p>
                                  )}
                                  <p className="font-semibold font-roboto text-gray-800">
                                    {address.city}, {address.state}{" "}
                                    {address.pincode}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {selectedAddress &&
                                  selectedAddress._id === address._id && (
                                    <Check className="text-black w-6 h-6 mr-2" />
                                  )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(address._id);
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 mb-4">No addresses found.</p>
                    )}
                    {!showForm && (
                      <button
                        className="mt-4 flex items-center justify-center w-full py-2 border border-transparent text-xl font-medium rounded-md text-white bg-gray-900 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setShowForm(true)}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Address
                      </button>
                    )}
                    {showForm && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-3xl font-bold font-roboto text-gray-900 mb-4">
                          Add New Address
                        </h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Address Line 1"
                            value={newAddress.addressLine1}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                addressLine1: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          />
                          <input
                            type="text"
                            placeholder="Address Line 2 (Optional)"
                            value={newAddress.addressLine2}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                addressLine2: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          />
                          <input
                            type="text"
                            placeholder="Pincode"
                            value={newAddress.pincode}
                            onChange={handlePincodeChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          />
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                state: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                          />
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="isDefault"
                              checked={newAddress.isDefault}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  isDefault: e.target.checked,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="isDefault"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Set as default address
                            </label>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setShowForm(false)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSaveAddress}
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save Address
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Payment Section */}
                {currentTab === "payment" && isAddressSelected && (
                  <div className="transform transition-all duration-500 ease-out animate-fadeIn">
                    <h3 className="text-lg font-bold mb-4">Payment Options</h3>
                    {/* Payment options for cash on delivery or online payment */}
                    <div className="space-y-4">
                      <button
                        className={`w-full py-3 px-4 rounded-lg transition-colors ${
                          paymentMethod === "cod"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            <CreditCard className="w-6 h-6 mr-2 inline" /> Cash
                            on Delivery
                          </span>
                          {paymentMethod === "cod" && (
                            <Check className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </button>
                      <button
                        className={`w-full py-3 px-4 rounded-lg transition-colors ${
                          paymentMethod === "online"
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("online")}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            <Truck className="w-6 h-6 mr-2 inline" /> Online
                            Payment
                          </span>
                          {paymentMethod === "online" && (
                            <Check className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </button>
                    </div>
                    <button
                      className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                      onClick={handleOrder}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Processing Payment...
                        </div>
                      ) : (
                        <span>
                          Place Order <span className="ml-2">→</span>
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <OrderConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderDetails={orderDetails}
        />
      )}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Order Placed Successfully!
            </h2>
            <p className="mb-4">
              Your order has been placed and we'll send you an email with the
              details.
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={() => {
                setSuccessMessage(false);
                navigate("/");
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Checko;
