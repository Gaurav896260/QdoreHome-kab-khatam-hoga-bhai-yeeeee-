// Product.jsx
import React from 'react';
import { FaArrowRight, FaTag, FaInfoCircle } from 'react-icons/fa';
import image1 from '../../assets/wooden/wooden11.png';
import image2 from '../../assets/wooden/wooden22.png';
import image3 from '../../assets/wooden/wooden33.png';
import image4 from '../../assets/wooden/wooden44.png';
import image5 from '../../assets/wooden/wooden55.png';
import image6 from '../../assets/wooden/wooden66.png';
import Navbar from "../../components/Navbar/Navbar.jsx"  // Adjust the path as needed
import Footer from '../../components/Footer/Footer.jsx';  // Adjust the path as needed
import AOS from "aos";
import "aos/dist/aos.css";

// Product component
const Product = ({ product }) => {
  return (
    <div className="product-container bg-white rounded-lg shadow-lg overflow-hidden mb-6">
      <div className="product-heading bg-gray-800 text-white text-center py-2">
        {product.heading}
      </div>
      <div className="product-content flex flex-col md:flex-row p-4">
        <div className="product-image flex-shrink-0 w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.heading}
            className="w-full h-auto object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="product-details flex flex-col justify-between md:w-1/2 md:pl-4">
          <div className="product-description text-gray-700 mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-gray-500" />
            <p>{product.description}</p>
          </div>
          <div className="product-price text-gray-900 text-xl font-bold mb-4 flex items-center">
            <FaTag className="mr-2 text-gray-500" />
            ${product.price}
          </div>
          <a
            href={product.link}
            className="product-button flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-2">See Product</span>
            <FaArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

// Example usage of Product component with Navbar and Footer
const ProductsList = () => {
  const products = [
    {
      heading: 'Product 1',
      image: image1,
      description: 'This is the description for Product 1.',
      price: '29.99',
      link: '/product/1',
    },
    {
      heading: 'Product 2',
      image: image2,
      description: 'This is the description for Product 2.',
      price: '39.99',
      link: '/product/2',
    },
    {
      heading: 'Product 3',
      image: image3,
      description: 'This is the description for Product 3.',
      price: '49.99',
      link: '/product/3',
    },
    {
      heading: 'Product 4',
      image: image4,
      description: 'This is the description for Product 4.',
      price: '59.99',
      link: '/product/4',
    },
    {
      heading: 'Product 5',
      image: image5,
      description: 'This is the description for Product 5.',
      price: '69.99',
      link: '/product/5',
    },
    {
      heading: 'Product 6',
      image: image6,
      description: 'This is the description for Product 6.',
      price: '79.99',
      link: '/product/6',
    },
  ];

  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    
    <div>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsList;
