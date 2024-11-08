import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowUp, FaHandshake, FaTags, FaCogs, FaShippingFast, FaLeaf, FaBuilding, FaGift, FaDraftingCompass, FaHotel, FaGlobe, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from 'react-icons/fa6';
import Footer from "../components/Footer/Footer";
import Popup from "../components/Popup/Popup";
import ThankYouModal from "./ThankyouModal.jsx"; // Import the modal
import b2b from "../assets/b2b.jpg";

const B2B = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the modal

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendEmail(formData); // Call your email sending function here
      console.log("Email sent:", formData);
      // Reset the form after submission
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
      setShowModal(true); // Show the modal on success
    } catch (error) {
      console.error("Error sending email:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };

  const sendEmail = async (data) => {
    const response = await fetch("https://qdore-backend-final-final-last.vercel.app/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }
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

  const handleMouseEnter = (e) => {
    e.currentTarget.classList.remove("animated-icon");
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.add("animated-icon");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-white">
      <style>
        {`
        .gradient-text {
          background: linear-gradient(90deg, rgba(73,73,80,1) 0%, rgba(98,98,102,1) 40%, rgba(52,65,69,1) 82%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}
      </style>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <div className="container mx-auto mt-5 mb-12 px-20">
        <div className="text-center mb-5 mt-5">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent">
            Welcome to <br /> Qdore Home B2B
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          <div className="lg:w-2/5 pr-10">
            <p className="mt-5 text-black text-lg lg:text-2xl font-roboto text-center">
              Partner with Us for Exceptional Quality and Design. Our B2B
              solutions are designed to help your business thrive by providing
              access to our extensive range of high-quality home decor products,
              competitive pricing, and reliable services.
              <br />
              <br /> We welcome brick & mortar retailers, interior designers &
              architects with extensive discounts on bulk orders. With our
              in-house manufacturing facility in Moradabad, we are capable to do
              large corporate orders with customization solutions in all kinds
              of materials - Metal, Natural Solid Wood, Natural Marble, Mirror &
              Glass.
            </p>
          </div>

          <div className="lg:w-1/2 w-full bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl text-center font-bold mb-4">
              PARTNER WITH US
            </h3>
            <p className="mt-3 text-lg text-center text-gray-600">
              Tell about your bulk enquiry...
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile No."
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-lg bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white py-2 rounded-lg hover:black transition-all"
              >
                Connect Now
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mb-20 mt-20">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent">Why Partner with Qdore Home?</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaTags className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Legacy of Quality</h3>
            <p className="text-gray-600 text-lg font-roboto">
              With over 15 years of experience through Quality Exports, we ensure top-notch products that meet international standards.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaCogs className="text-5xl mb-4 mx-auto" />
            <h3 className="font-semibold mb-2 text-2xl font-roboto">Customization Options</h3>
            <p className="text-gray-600 text-lg font-roboto">
              Tailor our products to meet your specific business needs with our extensive customization options.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaShippingFast className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Reliable Supply Chain</h3>
            <p className="text-gray-600 text-lg font-roboto">
              We ensure timely delivery of high-quality products through our efficient and reliable supply chain.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaLeaf className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600 text-lg font-roboto">
              Supporting local artisans and sustainable practices to ensure a positive impact on the environment.
            </p>
          </div>
        </div>
        <div className="text-center mb-20 mt-20">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent">Our B2B Services</h1>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Boxes (3 in a column) */}
          <div className="flex flex-col w-full lg:w-1/2 space-y-8">
            <div className="bg-white m-5 p-6 rounded-lg shadow-lg w-full hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FaBuilding className="text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-roboto font-semibold mb-2 text-center">Wholesale Orders</h3>
              <p className="text-gray-600 text-lg font-roboto text-center">
                Purchase our products in bulk at competitive prices to meet your business demands.
              </p>
            </div>

            <div className="bg-white m-5 p-6 rounded-lg shadow-lg w-full hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FaGift className="text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-roboto font-semibold mb-2 text-center">Corporate Gifting</h3>
              <p className="text-gray-600 text-lg font-roboto text-center">
                Unique and beautifully crafted corporate gifts to leave a lasting impression on your clients and employees.
              </p>
            </div>

            <div className="bg-white m-5 p-6 rounded-lg shadow-lg w-full hover:shadow-xl transform hover:-translate-y-2 transition-all animated-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <FaDraftingCompass className="text-5xl mb-4 mx-auto" />
              <h3 className="text-2xl font-roboto font-semibold mb-2 text-center">Interior Design Solutions</h3>
              <p className="text-gray-600 text-lg font-roboto text-center">
                Source bespoke furniture and decor for your projects, ensuring a unique and personalized touch.
              </p>
            </div>
          </div>

          {/* Image on the right */}
          <div className="flex justify-center items-center w-full lg:w-2/5 mt-10 lg:mt-0">
            <img src={b2b} alt="B2B Services" className="rounded-lg shadow-lg max-w-full h-auto" />
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaArrowUp size={20} />
      </button>

      <a
        href="https://api.whatsapp.com/send?phone=7983131615"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />

      </a>
      <style jsx="true">{`
        .text-navy {
          color: #001f3f;
        }
        .bg-navy {
          background-color: #001f3f;
        }
        .animated-icon {
          animation: pulse;
        }
        .animated-heading {
          animation: fadeIn 2s ease-in-out;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <Footer />
      <ThankYouModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />{" "}
      {/* Modal */}
    </div>
  );
};

export default B2B;
