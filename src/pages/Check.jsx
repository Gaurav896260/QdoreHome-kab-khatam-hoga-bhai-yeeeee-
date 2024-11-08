import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Check, CreditCard, Truck, Plus, Trash2 } from "lucide-react";
import OrderConfirmationModal from "./BuyNowmodal";
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const Checko = () => {
    const [currentTab, setCurrentTab] = useState('contact');
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();
    const location = useLocation();
    const { orderData } = location.state || {};
    const [addresses, setAddresses] = useState([]);
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

    useEffect(() => {
        loadRazorpayScript();
        if (userInfo && userInfo._id) {
            fetchUserDetails(userInfo._id);
        } else {
            navigate("/auth");
        }
    }, [userInfo, navigate]);

    useEffect(() => {
        // Check if returning from OTP verification
        const tempOrderData = localStorage.getItem("tempOrderData");
        if (tempOrderData) {
            const { orderData, selectedAddress, paymentMethod } =
                JSON.parse(tempOrderData);

            // Restore the state
            setSelectedAddress(selectedAddress);
            setPaymentMethod(paymentMethod);

            // Process the order
            processOrder(orderData, selectedAddress, paymentMethod);

            // Clear the temporary data
            localStorage.removeItem("tempOrderData");
        }
    }, []);

    const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded successfully");
        script.onerror = () =>
            setError("Failed to load Razorpay. Please try again later.");
        document.body.appendChild(script);
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
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user details:", error);
            toast.error("Failed to load user details");
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

    const handleOrder = async () => {
        setIsProcessingPayment(true);
        setError(null);

        try {
            if (!selectedAddress) {
                throw new Error("Please select an address.");
            }

            if (!orderData) {
                throw new Error("Order data is missing.");
            }

            // Save the current order data and selected address to localStorage
            localStorage.setItem(
                "tempOrderData",
                JSON.stringify({
                    orderData,
                    selectedAddress,
                    paymentMethod,
                })
            );

            // Redirect to OTP verification page
            navigate("/otp", { state: { redirectTo: "/select-address" } });
        } catch (error) {
            console.error("Error processing order:", error);
            setError("Error processing order: " + error.message);
            setIsProcessingPayment(false);
        }
    };

    const processOrder = async (orderData, selectedAddress, paymentMethod) => {
        setIsProcessingPayment(true);
        setError(null);

        try {
            const { addressLine1, addressLine2, city, state, pincode, country } =
                selectedAddress;

            const newOrderData = {
                userId: userInfo._id,
                address: {
                    line1: addressLine1,
                    line2: addressLine2 || "",
                    city,
                    state,
                    postalCode: pincode,
                    country,
                },
                items: orderData.products,
                amount: orderData.totalAmount,
            };

            if (paymentMethod === "cod") {
                // Process Cash on Delivery order
                const codOrderData = {
                    ...newOrderData,
                    paymentMethod: "Cash on Delivery",
                };

                const orderResponse = await fetch(
                    "https://qdore-backend-final-final-last.vercel.app/api/users/buynoworder",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userInfo.token}`,
                        },
                        body: JSON.stringify(codOrderData),
                    }
                );

                if (!orderResponse.ok) {
                    const errorData = await orderResponse.json();
                    throw new Error(`Failed to save order: ${errorData.message}`);
                }

                const savedOrderData = await orderResponse.json();
                localStorage.setItem("orderDetails", JSON.stringify(savedOrderData));
                setOrderDetails(savedOrderData);
                toast.success("Order placed successfully!");
                setIsModalOpen(true);

                // Send confirmation email for COD
                await fetch(
                    "https://qdore-backend-final-final-last.vercel.app/api/send-email/confirmationemail",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: userInfo.email,
                            username: userInfo.username,
                            address: `${addressLine1}, ${city}, ${state}, ${pincode}`,
                            amount: newOrderData.amount,
                            paymentMethod: "Cash on Delivery",
                        }),
                    }
                );

                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                // Process online payment
                if (!window.Razorpay) {
                    throw new Error(
                        "Razorpay script not loaded. Please refresh the page and try again."
                    );
                }

                const options = {
                    key: "rzp_live_p1es1jMXE5rpo5",
                    amount: Math.round(newOrderData.amount * 100),
                    currency: "INR",
                    name: "Qdore Home",
                    description: "Qrder Transaction",
                    handler: async function (response) {
                        try {
                            const onlineOrderData = {
                                ...newOrderData,
                                paymentId: response.razorpay_payment_id,
                                paymentMethod: "Online Payment",
                            };
                            const orderResponse = await fetch(
                                "http://localhost:3000/api/users/buynoworder",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${userInfo.token}`,
                                    },
                                    body: JSON.stringify(onlineOrderData),
                                }
                            );

                            if (!orderResponse.ok) {
                                const errorData = await orderResponse.json();
                                throw new Error(`Failed to save order: ${errorData.message}`);
                            }

                            const savedOrderData = await orderResponse.json();
                            localStorage.setItem(
                                "orderDetails",
                                JSON.stringify(savedOrderData)
                            );
                            setOrderDetails(savedOrderData);
                            toast.success("Order placed successfully!");
                            setIsModalOpen(true);

                            // Send confirmation email for online payment
                            await fetch(
                                "https://qdore-backend-final-final-last.vercel.app/api/send-email/confirmationemail",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        email: userInfo.email,
                                        username: userInfo.username,
                                        address: `${addressLine1}, ${city}, ${state}, ${pincode}`,
                                        amount: newOrderData.amount,
                                        paymentMethod: "Online Payment",
                                    }),
                                }
                            );

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
                        color: "#3399cc",
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error("Error processing order:", error);
            setError("Error processing order: " + error.message);
        } finally {
            setIsProcessingPayment(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center p-6">
                <div className="max-w-5xl w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
                    {/* Main Container */}
                    <div className="flex flex-col lg:flex-row w-full">
                        {/* Left Container: Order Summary */}
                        <div className="w-full lg:w-1/3 p-6 bg-gray-50 rounded-l-lg">
                            <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
                            <div className="flex items-center mb-6 transition-transform transform hover:scale-105">
                                <img
                                    src="path/to/image.jpg" // Replace with your product image path
                                    alt="Product"
                                    className="w-16 h-16 rounded-lg"
                                />
                                <div className="ml-4">
                                    <p className="text-sm font-semibold">
                                        A Bridge of Hands Wall Painting - 16 x 20 Inch / Canvas / Canvas Stretch
                                    </p>
                                    <p className="text-sm">Quantity: 2</p>
                                    <p className="text-sm font-bold">Price: ₹2,998.00</p>
                                </div>
                            </div>
                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <p>Subtotal</p>
                                    <p>₹2,998.00</p>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <p>Shipping</p>
                                    <p>To be calculated</p>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <p>Total</p>
                                    <p>₹2,998.00</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Container: Tabs for Contact, Address, Payment */}
                        <div className="w-full lg:w-2/3 p-6">
                            {/* Navigation Tabs */}
                            <div className="flex justify-around mb-6 border-b pb-2">
                                <button
                                    className={`px-4 py-2 transition duration-300 ${currentTab === 'contact'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                    onClick={() => handleTabChange('contact')}
                                >
                                    Contact
                                </button>
                                <button
                                    className={`px-4 py-2 transition duration-300 ${currentTab === 'address'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                    onClick={() => handleTabChange('address')}
                                >
                                    Address
                                </button>
                                <button
                                    className={`px-4 py-2 transition duration-300 ${currentTab === 'payment'
                                        ? 'border-b-2 border-blue-500 text-blue-600'
                                        : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                    onClick={() => handleTabChange('payment')}
                                >
                                    Payment
                                </button>
                            </div>

                            {/* Tab Content */}
                            {currentTab === 'contact' && (
                                <div className="animate-fadeIn">
                                    <h3 className="text-lg font-bold mb-4">Enter Mobile Number</h3>
                                    <div className="flex items-center border rounded-lg p-2 mb-4 hover:border-blue-500 transition duration-300">
                                        <span className="text-gray-500 pr-2">+91</span>
                                        <input
                                            type="text"
                                            className="flex-1 outline-none"
                                            placeholder="7851838615"
                                        />
                                    </div>
                                    <label className="flex items-center text-sm">
                                        <input type="checkbox" className="mr-2" />
                                        Send me order updates and offers
                                    </label>
                                    <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                                        Get OTP <span className="ml-2">→</span>
                                    </button>
                                </div>
                            )}

                            {currentTab === 'address' && (
                                <div className="animate-fadeIn">
                                    <h3 className="text-lg font-bold mb-4">Address Details</h3>
                                    {/* Add address form or saved addresses */}
                                    {addresses.length > 0 ? (
                                        <div className="space-y-4">
                                            {addresses.map((address) => (
                                                <div
                                                    key={address._id}
                                                    className={`border-2 p-4 rounded-lg cursor-pointer transition-all duration-200 ${selectedAddress && selectedAddress._id === address._id
                                                        ? "border-black bg-gray-50"
                                                        : "border-gray-200 hover:border-gray-400"
                                                        }`}
                                                    onClick={() => setSelectedAddress(address)}
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
                                                                    {address.city}, {address.state} {address.pincode}
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
                                                        setNewAddress({ ...newAddress, city: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    value={newAddress.state}
                                                    onChange={(e) =>
                                                        setNewAddress({ ...newAddress, state: e.target.value })
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

                            {currentTab === 'payment' && (
                                <div className="animate-fadeIn">
                                    <h3 className="text-lg font-bold mb-4">Payment Options</h3>
                                    {/* Payment options for cash on delivery or online payment */}
                                    <p>Payment options content will go here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checko;
