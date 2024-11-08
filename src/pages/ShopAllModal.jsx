import React from "react";

const Modal = ({ isVisible, onClose, product }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Product Added to Cart</h2>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4"
        />
        <h3 className="text-md font-semibold">{product.name}</h3>
        <p className="text-gray-600">Price: ₹{product.originalPrice}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
