import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://via.placeholder.com/200',
    originalPrice: 150,
    discountedPrice: 100,
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://via.placeholder.com/200',
    originalPrice: 200,
    discountedPrice: 150,
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://via.placeholder.com/200',
    originalPrice: 300,
    discountedPrice: 250,
  },
  // Add more products here...
];

const Videos = () => {
  const navigate = useNavigate();

  const handleCheckout = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <div className="flex items-center mt-2">
              <span className="text-gray-500 line-through mr-2">${product.originalPrice}</span>
              <span className="text-green-500 font-semibold">${product.discountedPrice}</span>
            </div>
            <button
              onClick={() => handleCheckout(product.id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
