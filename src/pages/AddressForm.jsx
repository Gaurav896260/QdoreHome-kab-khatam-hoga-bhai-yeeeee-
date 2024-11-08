import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AddressForm = () => {
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });
  const [notification, setNotification] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
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

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      console.error("User info is not available");
      return;
    }

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

      setNotification("Address saved successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Error saving address:", error);
      setNotification("Failed to save address. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full mx-auto">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-roboto">
          Add New Address
        </h2>
        <form onSubmit={handleSaveAddress} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="addressLine1" className="sr-only">
                Address Line 1
              </label>
              <input
                id="addressLine1"
                name="addressLine1"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Address Line 1"
                value={newAddress.addressLine1}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label htmlFor="addressLine2" className="sr-only">
                Address Line 2
              </label>
              <input
                id="addressLine2"
                name="addressLine2"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Address Line 2 (Optional)"
                value={newAddress.addressLine2}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="City"
                value={newAddress.city}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="State"
                value={newAddress.state}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label htmlFor="pincode" className="sr-only">
                Pincode
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={handlePincodeChange}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="isDefault"
              name="isDefault"
              type="checkbox"
              className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
              checked={newAddress.isDefault}
              onChange={() =>
                setNewAddress((prev) => ({
                  ...prev,
                  isDefault: !prev.isDefault,
                }))
              }
            />
            <label
              htmlFor="isDefault"
              className="ml-2 block text-sm text-gray-900"
            >
              Set as default address
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Save Address
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-3"
            >
              Cancel
            </button>
          </div>
        </form>

        {notification && (
          <div className="mt-4 text-center text-sm font-medium text-gray-700">
            {notification}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AddressForm;
