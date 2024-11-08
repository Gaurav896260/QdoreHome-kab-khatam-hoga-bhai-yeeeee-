import React, { useEffect, useState } from "react";
import { FaArrowRight, FaTag, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { toast } from "react-toastify"; 
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import imageW1 from "../../assets/Front/acaciacandle.jpg";
import imageW2 from "../../assets/Front/acaciaside.jpg";
import imageW3 from "../../assets/Front/acaciabowl4.jpg";
import imageW4 from "../../assets/Front/acaciabowl1.jpg";
import imageW5 from "../../assets/Front/acaciabowl2.jpg";
import imageW6 from "../../assets/Front/acaciabowl3.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const LoadingSpinner = () => (
  <FaSpinner className="animate-spin inline-block" />
);

const WoodenCollection = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  
  const products = [
    {
      id: "acacia-wood-candle-holder",
      name: "ACACIA WOOD CANDLE HOLDER",
      image: imageW1,
      originalPrice: 3200,
      discountedPrice: 250,
      imageUrl: "QmVF14R3txgX1KMGpwdVfqEvfoVR7PE7d7W8ug2v9FrUYs"
    },
    {
      id: "acacia-wood-side-table",
      name: "ACACIA WOOD SIDE TABLE",
      image: imageW2,
      originalPrice: 9500,
      discountedPrice: 250,
      imageUrl: "QmPGL55ptqpqE2xciGq1pnAwJEouW4zzBKbZvmQpdNwp7F"
    },
    {
      id: "acacia-wood-bowl-i",
      name: "ACACIA WOOD BOWL-I",
      image: imageW3,
      originalPrice: 1400,
      discountedPrice: 250,
      imageUrl: "QmdY1dBxtXJo4eiWkfj19uvtuxAXEzHasJVrBwAEALt4Gk"
    },
    {
      id: "acacia-circular-wood-bowl-and-spoon-set",
      name: "ACACIA CIRCULAR WOOD BOWL & SPOON SET",
      image: imageW4,
      originalPrice: 550,
      discountedPrice: 250,
      imageUrl: "Qma8eQCEmKDPjwcPnm8GpnQC5dRiRR4jTUtBNfHqS8qApC"
    },
    {
      id: "acacia-wood-bowl-and-serve-set",
      name: "ACACIA WOOD BOWL & SERVE SET",
      image: imageW5,
      originalPrice: 2300,
      discountedPrice: 250,
      imageUrl: "QmPbJMEuYfxcXAKCPY5ggzxKu2zXSiNTZJy4GTKZ6EddAf"
    },
    {
      id: "acacia-wood-bowl-ii",
      name: "ACACIA WOOD BOWL-II",
      image: imageW6,
      originalPrice: 1400,
      discountedPrice: 250,
      imageUrl: "QmREs136bK13SDkEFeoSvY85GqBrAWUWMqFbb7Pfq8Nqqc"
    },
  ];

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
    // Set loading state for this specific product's "Add to Cart" button
    setLoadingStates((prev) => ({
      ...prev,
      [`cart-${product.id}`]: true,
    }));

    try {
      if (!userInfo) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingItem = cartItems.find(
          (item) => item.productId === product.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
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
        return;
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
    } finally {
      // Reset loading state
      setLoadingStates((prev) => ({
        ...prev,
        [`cart-${product.id}`]: false,
      }));
    }
  };

  const handleBuyNow = async (product) => {
    // Set loading state for this specific product's "Buy Now" button
    setLoadingStates((prev) => ({
      ...prev,
      [`buy-${product.id}`]: true,
    }));

    try {
      await handleNavigation(product);
    } finally {
      // Reset loading state
      setLoadingStates((prev) => ({
        ...prev,
        [`buy-${product.id}`]: false,
      }));
    }
  };

  const handleNavigation = (product) => {
    console.log("Navigating to:", product.id);
    navigate(`/woodenCollection/${product.id}`);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveProduct(null);
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
        WOODEN COLLECTION
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
                    onClick={() => handleBuyNow(product)}
                    disabled={loadingStates[`buy-${product.id}`]}
                    className="bg-black w-1/2 text-white text-xl px-5 py-2 rounded transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingStates[`buy-${product.id}`] ? (
                      <LoadingSpinner />
                    ) : (
                      "Buy Now"
                    )}
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingStates[`cart-${product.id}`]}
                    className="bg-black w-1/2 text-white text-xl px-5 py-2 rounded transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingStates[`cart-${product.id}`] ? (
                      <LoadingSpinner />
                    ) : (
                      "Add to Cart"
                    )}
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

export default WoodenCollection;
