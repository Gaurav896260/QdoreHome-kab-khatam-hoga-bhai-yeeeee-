// ConfirmationModal.jsx
import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
        <p>Are you sure you want to cancel this order?</p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Yes, Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            No, Keep Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
