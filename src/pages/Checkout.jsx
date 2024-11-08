import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { FaCreditCard, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import OrderConfirmationModal from "./BuyNowmodal";
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedAddress = location.state?.selectedAddress;

  useEffect(() => {
    fetchCart();
    loadRazorpayScript();
  }, [userInfo]);

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

  const handleChangeAddress = () => {
    navigate("/orderAddress");
  };

  const getImageUrl = (ipfsHash) => {
    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-gray-600" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Order Summary
            </h2>
            {cart.length > 0 ? (
              cart.map((item) => {
                const imageUrl = getImageUrl(item.image);
                return (
                  <div
                    key={item.productId}
                    className="flex items-center border-b border-gray-200 py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover mr-6 rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        ₹{item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="text-gray-800 font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">
                  Total
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment and Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Payment Method
            </h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <FaCreditCard className="text-gray-600" />
                <span className="text-gray-800">Online Payment</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  className="form-radio text-black"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <FaMoneyBillWave className="text-gray-600" />
                <span className="text-gray-800">Cash on Delivery</span>
              </label>
            </div>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Shipping Address
            </h2>
            {selectedAddress ? (
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <p className="text-gray-800">{selectedAddress.addressLine1}</p>
                <p className="text-gray-800">{selectedAddress.addressLine2}</p>
                <p className="text-gray-800">
                  {selectedAddress.city}, {selectedAddress.state}{" "}
                  {selectedAddress.pincode}
                </p>
              </div>
            ) : (
              <p className="text-red-500 mb-6">No address selected</p>
            )}

            <div className="space-y-4">
              <button
                className={`w-full bg-black text-white font-bold py-3 px-4 rounded-md transition duration-300 ${
                  isProcessingPayment
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-800"
                }`}
                onClick={handleOrder}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
              <button
                className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                onClick={handleChangeAddress}
              >
                Change Address
              </button>
            </div>
          </div>
        </div>
        <OrderConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderDetails={orderDetails}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
