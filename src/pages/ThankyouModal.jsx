import React from "react";
import { X } from "lucide-react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const ThankYouModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>

    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Thank You!</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            We appreciate you connecting with us. Your engagement means a lot,
            and we're excited about the opportunity to serve you better.
          </p>
          <div className="flex justify-end">
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-10  transition-opacity duration-300"
        onClick={onClose}
      />
    </div>
    </>
  );
};

export default ThankYouModal;
