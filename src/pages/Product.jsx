import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (product.id.includes("side")) {
            navigate(`/furniture/side-table/${product.id}`);
        } else if (product.id.includes("candle") || product.id.includes("lanterns")) {
            navigate(`/decor/candleDecor/${product.id}`);
        } else if (product.id.includes("mercury")) {
            navigate(`/mercuryCollection/${product.id}`);
        } else if (product.id.includes("globe")) {
            navigate(`/decor/objectDecor/${product.id}`);
        } else {
            navigate(`/woodenCollection/${product.id}`);
        }
    };

    return (
        <div
            className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
            <img
                src={product.image}
                alt={product.heading}
                className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{product.heading}</h2>
                <div className="flex items-center mt-2">
                    <span className="text-gray-500 line-through mr-2">${product.originalPrice}</span>
                    <span className="text-green-500 font-semibold">${product.discountedPrice}</span>
                </div>
                <button
                    onClick={handleNavigation}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Product;
