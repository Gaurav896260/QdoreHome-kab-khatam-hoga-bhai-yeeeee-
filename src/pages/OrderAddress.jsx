import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

const OrderAddress = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  useEffect(() => {
    if (userInfo?.email) {
      fetchUserAddresses(userInfo.email);
    }
  }, [userInfo]);

  const fetchUserAddresses = async (email) => {
    try {
      const response = await fetch(
        `https://qdore-backend-final-final-last.vercel.app/api/users/email/${encodeURIComponent(
          email
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch addresses.");
      }

      const data = await response.json();

      if (data.user && data.user.addresses) {
        setAddresses(data.user.addresses);
      } else {
        console.error("Addresses not found in the response.");
      }
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
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

      fetchUserAddresses(userInfo.email);
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

  const handleCancel = () => {
    setShowForm(false);
    setNewAddress({
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
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
      fetchUserAddresses(userInfo.email);
    } catch (error) {
      toast.error("Failed to delete address.");
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl text-center font-semibold mb-8 text-gray-800 font-roboto">
          Select Delivery Address
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 font-roboto">
                {userInfo.username}
              </h2>
              <p className="text-gray-600 mb-4 font-roboto">
                {address.addressLine1}, {address.addressLine2}, {address.city},{" "}
                {address.state} - {address.pincode}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        cart: [],
                        selectedAddress: address,
                      },
                    });
                  }}
                  className="bg-black text-white font-roboto px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Deliver Here
                </button>
                <button
                  onClick={() => handleDeleteAddress(address._id)}
                  className="text-gray-400 hover:text-black transition-colors duration-200"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-8 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center"
        >
          <FaPlus className="mr-2 font-roboto" /> Add New Address
        </button>
        {showForm && (
          <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold font-roboto mb-6 text-gray-800">
              New Address
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold font-roboto">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={newAddress.addressLine1}
                  onChange={handleChange}
                  className="font-semibold font-roboto w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold font-roboto">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={newAddress.addressLine2}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold font-roboto">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleChange}
                    className="font-semibold font-roboto w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold font-roboto">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleChange}
                    className="font-semibold font-roboto w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold font-roboto">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={newAddress.pincode}
                    onChange={handlePincodeChange}
                    className="font-semibold font-roboto w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleSaveAddress}
                  className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 font-semibold font-roboto transition-colors duration-200"
                >
                  Save Address and Deliver Here
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 font-semibold font-roboto text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderAddress;
