import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer/Footer";
import "../pages/contact.css";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import ThankYouModal from "./ThankyouModal.jsx"; // Import the modal

const ContactUs = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State for the modal

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out",
      delay: 100,
    });
    AOS.refresh();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300) {
        setShowForm(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    try {
      const response = await axios.post(
        "https://qdore-backend-final-final-last.vercel.app/api/send-email",
        {
          name,
          email,
          message,
        }
      );

      if (response.status === 200) {
        setFormData({ name: "", email: "", message: "" });
        setError(""); // Clear previous error
        setShowModal(true); // Show the modal on success
      }
    } catch (err) {
      setError("Failed to send message. Please try again later.");
      console.error("Error sending email:", err);
    }
  };

  return (
    <div className="contact-us-page">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <section className="m-20">
        <div className="contact-form-container">
          <div className="contact-details" data-aos="fade-right">
            <h2>Contact Details</h2>
            <div className="mb-8">
              <h3>Email</h3>
              <p>admin@qdorehome.com</p>
            </div>
            <div className="mb-8">
              <h3 >Phone</h3>
              <p>+91 7983131615</p>
            </div>
            <div>
              <h3>Address</h3>
              <p>Qdore Home
                <br />Quality Collection Inc
                <br />Lakri Fazalpur, Delhi Road
                <br />Moradabad (UP) 244001, India</p>
            </div>
          </div>

          <div className="contact-form" data-aos="fade-left">
            <h2>Send Us A Message</h2>
            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-14"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full"
                placeholder="Write your message"
                rows="5"
                required
              ></textarea>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="w-full text-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <a
        href="https://api.whatsapp.com/send?phone=7983131615"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all z-50"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
      <Footer />
      <ThankYouModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />{" "}
      {/* Modal */}
    </div>
  );
};

export default ContactUs;
