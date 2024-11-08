import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import BackgroundImage from "../../assets/mainbg2.jpg"; // Import your background image here

const Hero = ({ handleOrderPopup }) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToProducts = () => {
    navigate("/ourCollection");
  };

  return (
    <div
      className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex justify-center items-center text-white duration-200"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Hero content with "Shop All" button */}
      <div
        className="absolute flex flex-col items-center justify-center text-center mt-10"
        style={{
          bottom: "200px", // Default for larger screens
        }}
      >
        <button
          onClick={navigateToProducts}
          className="text-sm text-black py-2 px-6  border-2 border-black  hover:opacity-100 bg-white bg-opacity-95"
        >
          Shop All
        </button>


      </div>

      {/* Adjusted position for smaller screens using Tailwind CSS */}

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center z-10"
      >
        <FaArrowUp size={20} />
      </button>

      {/* WhatsApp button */}
      <a
        href="https://api.whatsapp.com/send?phone=7983131615"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all z-50"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>

      {/* Animation CSS */}
      <style jsx="true">{`
        @keyframes buttonAnimation {
          0% {
            transform: scale(1);
            background-color: white;
          }
          50% {
            transform: scale(1.1);
            background-color: white;
          }
          100% {
            transform: scale(1);
            background-color: white;
          }
        }

        .animate-button {
          animation: buttonAnimation 3s infinite;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease;
        }

        .animate-button:hover {
          background: black;
        }

        @media (max-width: 440px) {
          h1 {
            font-size: 1.75rem;
          }

          p {
            font-size: 0.875rem;
          }
        }

        @media (max-width: 400px) {
          h1 {
            font-size: 1.8rem;
          }

          p {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 20px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
