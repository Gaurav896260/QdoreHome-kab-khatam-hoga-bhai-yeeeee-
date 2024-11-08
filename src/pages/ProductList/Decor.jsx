import React, { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import image11 from "../../assets/Front/classicalstarburst.png";
import image22 from "../../assets/Front/starburst.png";
import image33 from "../../assets/Front/solarcandle.png";
import image44 from "../../assets/Front/solarhurricane.jpg";
import image55 from "../../assets/Front/acaciacandle.jpg";
import image66 from "../../assets/Front/eris.png";
import image77 from "../../assets/Front/psyche.png";
import image1 from "../../assets/Front/globe.png";

import AOS from "aos";
import "aos/dist/aos.css";

const CandleHolder = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const products = [
    {
      id: "classical-starburst-lanterns",
      name: "THE CLASSICAL STARBURST LANTERNS",
      image: image11,
      originalPrice: 3200,
      discountedPrice: 250,
    },
    {
      id: "starburst-lanterns",
      name: "STARBURST LANTERNS",
      image: image22,
      originalPrice: 5000,
      discountedPrice: 250,
    },
    {
      id: "solar-candle-hurricanes",
      name: "SOLAR CANDLE HURRICANES",
      image: image44,
      originalPrice: 4500,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-candle-holders",
      name: "ACACIA WOOD CANDLE HOLDERS",
      image: image55,
      originalPrice: 3200,
      discountedPrice: 250,
    },
    {
      id: "eris-marble-candle-holders",
      name: "ERIS MARBLE CANDLE HOLDERS",
      image: image66,
      originalPrice: 2500,
      discountedPrice: 250,
    },
    {
      id: "psyche-candle-holders",
      name: "PSYCHE CANDLE HOLDERS",
      image: image77,
      originalPrice: 5000,
      discountedPrice: 250,
    },
    {
      id: "the-globe",
      name: "THE GLOBE",
      image: image1,
      originalPrice: 1400,
      discountedPrice: 250,
    },
  ];

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `https://qdore-backend-final-final-last.vercel.app/api/users/objectIdexport?fbUserId=${userInfo.fbUserId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Error fetching user data: " + error.message);
      return null;
    }
  };

  const handleAddToCart = async (product) => {
    if (!userInfo) {
      // User is not logged in, save to local storage
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existingItem = cartItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if product is already in cart
      } else {
        cartItems.push({
          productId: product.id,
          name: product.name,
          price: Number(product.originalPrice),
          image: `https://ipfs.io/ipfs/${product.imageUrl}`,
          quantity: 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setActiveProduct(product);
      setModalVisible(true);
      toast.success("Product added to cart!");
      return; // Exit function to avoid further execution
    }

    const token = userInfo?.token;

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    const userData = await fetchUserData();
    if (!userData || !userData._id) {
      toast.error("Failed to fetch user information.");
      return;
    }

    const mongoUserId = userData._id;

    try {
      const response = await fetch(
        "https://qdore-backend-final-final-last.vercel.app/api/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: mongoUserId,
            productId: product.id,
            name: product.name,
            price: Number(product.originalPrice),
            image: `https://ipfs.io/ipfs/${product.imageUrl}`,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      setActiveProduct(product);
      setModalVisible(true);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveProduct(null);
  };

  const handleNavigation = (product) => {
    console.log("Navigating to:", product.id);
    if (product.id.includes("candle") || product.id.includes("lanterns")) {
      navigate(`/decor/candleDecor/${product.id}`);
    } else if (product.id.includes("globe")) {
      navigate(`/decor/objectDecor/${product.id}`);
    }
  };

  useEffect(() => {
    console.log("Products:", products);
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <h1 className="text-center text-2xl font-normal font-montserrat mt-4">
        HOME DECOR
      </h1>
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
              data-aos="fade-up"
            >
              <img
                src={product.image}
                onClick={() => handleNavigation(product)}
                alt={product.name}
                className="w-full h-65 object-cover transition-opacity duration-300 hover:opacity-80 cursor-pointer"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-2xl text-center font-semibold mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-black font-semibold">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <FaTag className="text-gray-400" />
                </div>
                <div className="mt-4 flex justify-between gap-4">
                  <button
                    onClick={() => handleNavigation(product)}
                    className="bg-black w-1/2 text-white text-xl px-5 py-2 rounded transition-transform duration-300 hover:scale-105"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-black w-1/2 text-white text-xl px-5 py-2 rounded transition-transform duration-300 hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {/* Modal for Product Added Confirmation */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 text-center">
            <h3 className="text-xl font-semibold mb-3">Product Added!</h3>
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="w-32 mx-auto mb-3"
            />
            <p>{activeProduct.name} has been added to your cart.</p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandleHolder;
