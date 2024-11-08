import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const Check = () => {
  const [currentTab, setCurrentTab] = useState('contact');

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
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
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
              <button className="w-full py-2 px-4 border rounded-lg text-sm font-medium text-blue-600 hover:bg-gray-200 transition-colors duration-300">
                Apply Coupon
              </button>
            </div>

            {/* Right Container: Tabs for Contact, Address, Payment */}
            <div className="w-full lg:w-2/3 p-6">
              {/* Navigation Tabs */}
              <div className="flex justify-around mb-6 border-b pb-2">
                <button
                  className={`px-4 py-2 transition duration-300 ${
                    currentTab === 'contact'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => handleTabChange('contact')}
                >
                  Contact
                </button>
                <button
                  className={`px-4 py-2 transition duration-300 ${
                    currentTab === 'address'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => handleTabChange('address')}
                >
                  Address
                </button>
                <button
                  className={`px-4 py-2 transition duration-300 ${
                    currentTab === 'payment'
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
                  <p>Form to add new address or select saved address will go here.</p>
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

export default Check;
