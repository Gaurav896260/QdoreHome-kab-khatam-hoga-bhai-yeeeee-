import s11 from "../../assets/Serveware/s11.jpg";
import s12 from "../../assets/Serveware/s12.jpg";
import s13 from "../../assets/Serveware/s13.jpg";
import s14 from "../../assets/Serveware/s14.jpg";
import s21 from "../../assets/Serveware/s21.jpg";
import s22 from "../../assets/Serveware/s22.jpg";
import s23 from "../../assets/Serveware/s23.jpg";
import s24 from "../../assets/Serveware/s24.jpg";
import s25 from "../../assets/Serveware/s25.jpg";
import s26 from "../../assets/Serveware/s26.jpg";
import s31 from "../../assets/Serveware/s31.jpg";
import s32 from "../../assets/Serveware/s32.jpg";
import s33 from "../../assets/Serveware/s33.jpg";
import s34 from "../../assets/Serveware/s34.jpg";

import image61 from "../../assets/Lifestyle/Wooden/Fruit/fruit1.jpeg";
import image62 from "../../assets/Lifestyle/Wooden/Fruit/fruit2.jpeg";
import image63 from "../../assets/Lifestyle/Wooden/Fruit/fruit3.jpeg";
import image64 from "../../assets/wooden/wc66.png";

import image51 from "../../assets/Lifestyle/Wooden/Bowl/bowl1.jpeg";
import image52 from "../../assets/Lifestyle/Wooden/Bowl/bowl2.jpeg";
import image53 from "../../assets/Lifestyle/Wooden/Bowl/bowl3.jpeg";
import image54 from "../../assets/Lifestyle/Wooden/Bowl/bowl4.jpg";

import image41 from "../../assets/Lifestyle/Wooden/Cereal/cereal1.jpeg";
import image42 from "../../assets/Lifestyle/Wooden/Cereal/cereal2.jpeg";
import image43 from "../../assets/Lifestyle/Wooden/Cereal/cereal3.jpeg";
import image44 from "../../assets/Lifestyle/Wooden/Cereal/cereal4.jpg";

import image31 from "../../assets/Lifestyle/Wooden/Wavy/wavy1.jpeg";
import image32 from "../../assets/Lifestyle/Wooden/Wavy/wavy2.jpeg";
import image33 from "../../assets/Lifestyle/Wooden/Wavy/wavy3.jpg";
import image34 from "../../assets/wooden/wc33.png";

import imageW3 from "../../assets/Front/acaciabowl4.jpg";
import imageW4 from "../../assets/Front/acaciabowl1.jpg";
import imageW5 from "../../assets/Front/acaciabowl2.jpg";
import imageW6 from "../../assets/Front/acaciabowl3.jpg";

import s1 from "../../assets/Front/bowl1.jpeg";
import s2 from "../../assets/Front/chopping.jpeg";
import s3 from "../../assets/Front/dome.jpg";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AOS from "aos";
import { toast, ToastContainer } from "react-toastify";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import {
  FaTruck,
  FaMoneyBillAlt,
  FaUndo,
  FaBusinessTime,
  FaChevronDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
const productImages = {
  "acacia-wood-bowl-serveware": [s1, s11, s12, s13, s14],
  "chopping-board-serveware": [s2, s21, s22, s23, s24, s25, s26],
  "cake-dome-serveware": [s3, s31, s32, s33, s34],
  "acacia-wood-bowl-i": [imageW3, image31, image32, image33, image34],
  "acacia-circular-wood-bowl-and-spoon-set": [
    imageW4,
    image41,
    image42,
    image43,
    image44,
  ],
  "acacia-wood-bowl-and-serve-set": [
    imageW5,
    image51,
    image52,
    image53,
    image54,
  ],
  "acacia-wood-bowl-ii": [imageW6, image61, image62, image63, image64],
};

const products = [
  {
    id: "acacia-wood-bowl-serveware",
    name: "ACACIA WOOD BOWL",
    description: [
      "Elevate your home dining experience with Qdore Home’s versatile 𝐀𝐜𝐚𝐜𝐢𝐚 𝐖𝐨𝐨𝐝 𝐁𝐨𝐰𝐥. ",
      "Perfect for serving everything from soups and salads to snacks and even doubling as a chic plant pot, this multipurpose bowl brings natural elegance to your table. ",
      "Crafted for style and function, it’s an excellent gift for any occasion. ",
      "Complete with a matching spoon, it’s a must-have for your rustic kitchen decor.",
    ],
    price: 950,
    imageUrl: "QmTCMopBCRHGe9Act794xek44M9t3UD82YxmHf4zVdKSHC",
    material: "Acacia Wood",
    dimensions: "",
  },
  {
    id: "chopping-board-serveware",
    name: "CHOPPING BOARD",
    description: [
      "Upgrade your kitchen with our new Acacia Wood 𝐂𝐡𝐨𝐩𝐩𝐢𝐧𝐠 𝐁𝐨𝐚𝐫𝐝𝐬!",
      "Now available in two sleek shapes with rounded edges and a convenient handle for easy use.",
      "Crafted from sustainably sourced, food-safe wood, these boards are not only eco-friendly but also durable and stylish. ",
      "Say NO to Plastic—our heavy, thick Acacia boards bring a premium feel and natural beauty that will compliment your kitchen. ",
      "Easy and safe to clean, just rinse with mild detergent.",
    ],
    price: 3600,
    imageUrl: "QmYfYqpqHbWB6oPCXsXHetrsr2tWUtE7SnmiJAvqwvnrqq",
    material: "Acacia Wood",
    dimensions: "",
  },
  {
    id: "cake-dome-serveware",
    name: "CAKE DOME",
    description: [
      "Showcase your desserts in style with our 𝐂𝐚𝐤𝐞 𝐃𝐨𝐦𝐞, featuring a beautifully crafted Acacia wood stand with a clear glass cloche",
      "Ideal for cakes, cupcakes, and more, this elegant piece is both eco-friendly and food-safe, made from sustainably sourced wood. ",
      "A must-have for any kitchen, it’s expertly crafted by skilled artisans to bring a touch of sophistication to your home.",
    ],
    price: 4500,
    imageUrl: "QmYuEFGKQfGH7Gz1iuEtNxmjfFyRb1ggSXudhgcqJ8bsHj",
    material: "Acacia Wood",
    dimensions: "",
  },
];

const ServewaresDesc = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [activeProduct, setActiveProduct] = useState(
    () => products.find((product) => product.id === productId) || products[0]
  );
  const [activeImg, setActiveImage] = useState(
    productImages[activeProduct.id] ? productImages[activeProduct.id][0] : ""
  );
  const [amount, setAmount] = useState(1);
  const [showDescription, setShowDescription] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showCareInstructions, setShowCareInstructions] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to manage the popup visibility
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (productImages[activeProduct.id]) {
      setActiveImage(productImages[activeProduct.id][0]);
    }
  }, [activeProduct]);

  const fetchUserData = async () => {
    console.log(userInfo);
    try {
      const response = await fetch(
        `https://qdore-backend-final-final-last.vercel.app/api/users/objectIdexport?fbUserId=${userInfo.fbUserId}`, // Assuming this retrieves MongoDB user
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

      const data = await response.json(); // This should return MongoDB user data
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data: " + error.message);
      return null;
    }
  }; // Modify the handleAddToCart function
  const handleAddToCart = async () => {
    if (isLoading) return; // Prevent multiple clicks while loading

    setIsLoading(true); // Start loading

    if (userInfo) {
      const token = userInfo?.token;
      if (!token) {
        toast.error("Authentication token is missing.");
        setIsLoading(false); // Reset loading state
        return;
      }

      const userData = await fetchUserData();
      if (!userData || !userData._id) {
        toast.error("Failed to fetch user information.");
        setIsLoading(false); // Reset loading state
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
              productId: activeProduct.id,
              name: activeProduct.name,
              price: Number(activeProduct.price),
              image: `https://ipfs.io/ipfs/${activeProduct.imageUrl}`,
              quantity: amount,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }

        // Show success toast and popup
        toast.success("Product added to cart!");
        setPopupMessage("Product added to cart!");
        setShowPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false); // Reset loading state regardless of outcome
      }
    } else {
      // User is not logged in, save to local storage
      try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingItemIndex = cartItems.findIndex(
          (item) => item.productId === activeProduct.id
        );

        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += amount;
        } else {
          cartItems.push({
            productId: activeProduct.id,
            name: activeProduct.name,
            price: Number(activeProduct.price),
            image: `https://ipfs.io/ipfs/${activeProduct.imageUrl}`,
            quantity: amount,
          });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Show success toast and popup
        toast.success("Product added to cart!");
        setPopupMessage("Product added to cart!");
        setShowPopup(true);

        // Hide the popup after 3 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } catch (error) {
        toast.error("Failed to add item to cart");
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };
  const handleBuyNow = () => {
    if (!userInfo) {
      // Save current product to localStorage before redirecting
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push({
        productId: activeProduct.id,
        name: activeProduct.name,
        price: Number(activeProduct.price),
        image: `https://ipfs.io/ipfs/${activeProduct.imageUrl}`,
        quantity: amount,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Redirect to /auth if not logged in
      navigate("/auth", { state: { redirectTo: location.pathname } });
      return;
    }

    // If user is logged in, proceed with the existing logic
    const userId = userInfo?._id;

    if (!userId) {
      console.error("User ID is missing");
      alert("Please log in to purchase items.");
      return;
    }

    // Create an order object
    const orderData = {
      userId: userId,
      products: [
        {
          productId: activeProduct.id,
          name: activeProduct.name,
          quantity: amount,
          price: Number(activeProduct.price),
          image: `https://ipfs.io/ipfs/${activeProduct.imageUrl}`,
        },
      ],
      totalAmount: (Number(activeProduct.price) * amount).toFixed(2),
    };

    // Redirect to the Address Selection page with the order data
    navigate("/select-address", {
      state: { orderData },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row items-start justify-center">
          {/* Main Image and Thumbnails */}
          <div className="flex flex-col lg:flex-row lg:gap-3 lg:w-1/2">
            {/* Main Image */}
            <div className="flex-shrink-0 lg:w-2/3">
              <img
                src={activeImg}
                alt="Main Product"
                className="w-full h-full object-cover rounded-lg shadow-lg"
                style={{ maxHeight: "600px" }}
              />
            </div>
            {/* Thumbnail Images */}
            <div className="flex flex-row lg:flex-col lg:w-1/3 lg:mt-0 mt-4 justify-between">
              <div className="grid grid-cols-5 gap-2 lg:grid-cols-1 lg:gap-3">
                {productImages[activeProduct.id] &&
                  productImages[activeProduct.id].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 lg:w-1/3 lg:h-auto rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() => {
                        setActiveImage(img);
                        setActiveImageIndex(index); // Set the active image index
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* productImages[activeProduct.id].map((img, index) */}

          {/* Product Details Section */}
          <div className="lg:w-1/2 flex flex-col lg:pl-8 lg:gap-6 mt-6 lg:mt-0">
            <h1 className="text-5xl lg:text-8xl font-bold text-black mb-4 ">
              {activeProduct.name}
            </h1>
            <ul className="text-gray-700 text-2xl list- ">
              {activeProduct.description.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>

            <h2 className="text-4xl font-semibold my-4">
              ₹{activeProduct.price.toFixed(2)}
            </h2>

            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-lg"
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                >
                  -
                </button>
                <span className="py-2 px-4 text-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-lg"
                  onClick={() => setAmount(amount + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart & Buy Now */}
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className={`bg-black text-white py-2 px-6 rounded-xl flex items-center justify-center ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>
              {showPopup && (
                <div className="popup fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg transition duration-300">
                  {popupMessage}
                </div>
              )}
              <button
                onClick={handleBuyNow}
                className="bg-black text-white py-2 px-6 rounded-xl"
              >
                Buy Now
              </button>
            </div>

            {/* Features Section */}
            <div className="flex justify-between py-6 mt-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-5">
                <IconFeature icon={<FaTruck />} text="Free Delivery" />
                <IconFeature
                  icon={<FaMoneyBillAlt />}
                  text="Cash on Delivery"
                />
                <IconFeature icon={<FaUndo />} text="7 Days Return" />
                <IconFeature icon={<FaBusinessTime />} text="Quick Dispatch" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row  mt-8">
          <div className="lg:w-2/3">
            <div className="border-2 border-gray-300 rounded-lg p-1 mb-4">
              <CollapsibleSection
                title="Description"
                isOpen={showDescription}
                toggle={() => setShowDescription(!showDescription)}
              >
                <ul className="text-gray-700 text-sm list-disc list-inside">
                  {activeProduct.description.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </CollapsibleSection>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-1 mb-4">
              <CollapsibleSection
                title="Dimensions & Material"
                isOpen={showDimensions}
                toggle={() => setShowDimensions(!showDimensions)}
              >
                <p className="text-gray-700 text-sm ">
                  Dimensions: {activeProduct.dimensions}
                </p>
                <p className="text-gray-700 text-sm">
                  Material: {activeProduct.material}
                </p>
              </CollapsibleSection>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-1 mb-4">
              <CollapsibleSection
                title="Care Instructions"
                isOpen={showCareInstructions}
                toggle={() => setShowCareInstructions(!showCareInstructions)}
              >
                <p className="text-gray-700 text-sm">Clean with a dry cloth.</p>
              </CollapsibleSection>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-1 mb-4">
              <CollapsibleSection
                title="Shipping & Returns"
                isOpen={showShipping}
                toggle={() => setShowShipping(!showShipping)}
              >
                <p className="text-gray-700 text-sm">
                  Free shipping available. Returns accepted within 7 days.
                </p>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ title, isOpen, toggle, children }) => (
  <div className="my-4">
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={toggle}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <FaChevronDown className={isOpen ? "transform rotate-180" : ""} />
    </div>
    {isOpen && <div className="mt-2">{children}</div>}
  </div>
);

// IconFeature Component
const IconFeature = ({ icon, text }) => (
  <div className="flex flex-col items-center p-0 m-0 space-y-1">
    {" "}
    {/* Space between icon and text */}
    <div className="text-xl">{icon}</div>
    <span className="text-sm text-gray-700">{text}</span>
  </div>
);

export default ServewaresDesc;
