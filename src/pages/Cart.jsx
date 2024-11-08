import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import { Loader2, ShoppingCart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Enhanced Modal Component with Loading State
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full m-4">
        <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                <span>Removing...</span>
              </>
            ) : (
              <span>Remove</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-black" />
      <p className="text-lg font-semibold text-gray-800">
        Loading your cart...
      </p>
    </div>
  </div>
);

const Cart = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [dbCart, setDbCart] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  const products = [
    {
      id: "virgo-side-table",
      name: "VIRGO SIDE TABLE",
      originalPrice: 9500,
      discountedPrice: 250,
    },
    {
      id: "orbit-side-table",
      name: "ORBIT SIDE TABLE",
      originalPrice: 7700,
      discountedPrice: 250,
    },
    {
      id: "pluto-side-table",
      name: "PLUTO SIDE TABLE",
      originalPrice: 9500,
      discountedPrice: 250,
    },
    {
      id: "vega-side-table",
      name: "VEGA SIDE TABLE",
      originalPrice: 9500,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-side-table",
      name: "ACACIA WOOD SIDE TABLE",
      originalPrice: 9500,
      discountedPrice: 250,
    },
    {
      id: "the-cosmic-mirror-side-table",
      name: "THE COSMIC MIRROR SIDE TABLE",
      originalPrice: 25000,
      discountedPrice: 250,
    },
    {
      id: "classical-starburst-lanterns",
      name: "THE CLASSICAL STARBURST LANTERNS",
      originalPrice: 3200,
      discountedPrice: 250,
    },
    {
      id: "starburst-lanterns",
      name: "STARBURST LANTERNS",
      originalPrice: 5000,
      discountedPrice: 250,
    },
    {
      id: "solar-candle-hurricanes",
      name: "SOLAR CANDLE HURRICANES",
      originalPrice: 4500,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-candle-holders",
      name: "ACACIA WOOD CANDLE HOLDERS",
      originalPrice: 3200,
      discountedPrice: 250,
    },
    {
      id: "eris-marble-candle-holders",
      name: "ERIS MARBLE CANDLE HOLDERS",
      originalPrice: 2500,
      discountedPrice: 250,
    },
    {
      id: "psyche-candle-holders",
      name: "PSYCHE CANDLE HOLDERS",
      originalPrice: 5000,
      discountedPrice: 250,
    },
    {
      id: "the-globe",
      name: "THE GLOBE",
      originalPrice: 1400,
      discountedPrice: 250,
    },
    {
      id: "mercury-planter",
      name: "MERCURY PLANTER",
      originalPrice: 5000,
      discountedPrice: 250,
    },
    {
      id: "mercury-cone",
      name: "MERCURY CONE",
      originalPrice: 3200,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-candle-holder",
      name: "ACACIA WOOD CANDLE HOLDER",
      originalPrice: 3200,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-table-wooden",
      name: "ACACIA WOOD SIDE TABLE",
      originalPrice: 9500,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-bowl-i",
      name: "ACACIA WOOD BOWL-I",

      originalPrice: 1400,
      discountedPrice: 250,
    },
    {
      id: "acacia-circular-wood-bowl-and-spoon-set",
      name: "ACACIA CIRCULAR WOOD BOWL & SPOON SET",

      originalPrice: 550,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-bowl-and-serve-set",
      name: "ACACIA WOOD BOWL & SERVE SET",

      originalPrice: 2300,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-bowl-ii",
      name: "ACACIA WOOD BOWL-II",

      originalPrice: 1400,
      discountedPrice: 250,
    },
    {
      id: "acacia-wood-bowl-serveware",
      name: "ACACIA WOOD BOWL",

      originalPrice: 950,
      discountedPrice: 250,
    },
    {
      id: "chopping-board-serveware",
      name: "CHOPPING BOARD",

      originalPrice: 3600,
      discountedPrice: 250,
    },
    {
      id: "cake-dome-serveware",
      name: "CAKE DOME",

      originalPrice: 4500,
      discountedPrice: 250,
    },
  ];

  const handleNavigation = (product) => {
    if (product.id.includes("side")) {
      navigate(`/furniture/side-table/${product.id}`);
    } else if (
      product.id.includes("candle") ||
      product.id.includes("lanterns")
    ) {
      navigate(`/decor/candleDecor/${product.id}`);
    } else if (product.id.includes("mercury")) {
      navigate(`/mercuryCollection/${product.id}`);
    } else if (product.id.includes("globe")) {
      navigate(`/decor/objectDecor/${product.id}`);
    } else if (product.id.includes("serveware")) {
      navigate(`/servewares/${product.id}`);
    } else {
      navigate(`/woodenCollection/${product.id}`);
    }
  };

  useEffect(() => {
    if (location.state && location.state.fromOTP) {
      const tempCart = JSON.parse(localStorage.getItem("cartItems"));
      if (tempCart) {
        navigate("/orderAddress", { state: { cart: tempCart } });
        localStorage.removeItem("cartItems");
      }
    }
  }, [location, navigate]);
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

      return await response.json();
    } catch (error) {
      setError("Error fetching user data: " + error.message);
      return null;
    }
  };

  const fetchCart = async () => {
    try {
      if (userInfo && userInfo.token) {
        const userData = await fetchUserData();
        if (!userData || !userData._id) {
          setError("Failed to fetch user information.");
          return;
        }

        const mongoUserId = userData._id;

        const response = await fetch(
          `https://qdore-backend-final-final-last.vercel.app/api/cart/${mongoUserId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();
        setDbCart(data.products);
      }

      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setLocalCart(savedCart);
    } catch (error) {
      setError("Error fetching cart: " + error.message);
    }
  };

  useEffect(() => {
    let timeoutId;

    const initializeCart = async () => {
      setIsLoading(true);
      try {
        await fetchCart();
        // Ensure loading screen shows for at least 1 second to prevent flickering
        timeoutId = setTimeout(() => {
          setIsLoading(false);
          setIsInitialized(true);
        }, 1000);
      } catch (error) {
        console.error("Error initializing cart:", error);
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    if (!isInitialized) {
      initializeCart();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isInitialized]);

  useEffect(() => {
    if (location.state && location.state.fromOTP) {
      const tempCart = JSON.parse(localStorage.getItem("cartItems"));
      if (tempCart) {
        navigate("/orderAddress", { state: { cart: tempCart } });
        localStorage.removeItem("cartItems");
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity, isDbCart) => {
    if (isDbCart) {
      const updatedCart = dbCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      setDbCart(updatedCart);

      if (userInfo && userInfo.token) {
        try {
          const userData = await fetchUserData();
          if (!userData || !userData._id) {
            setError("Failed to fetch user information.");
            return;
          }

          const mongoUserId = userData._id;
          const url = `https://qdore-backend-final-final-last.vercel.app/api/cart/${mongoUserId}/update/${productId}`;
          const response = await fetch(url, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
            body: JSON.stringify({ quantity: newQuantity }),
          });

          if (!response.ok) {
            throw new Error("Failed to update cart quantity");
          }
        } catch (error) {
          setError("Error updating cart: " + error.message);
        }
      }
    } else {
      const updatedCart = localCart.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setLocalCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const handleIncrease = async (productId, isDbCart) => {
    const item = isDbCart
      ? dbCart.find((item) => item._id === productId)
      : localCart.find((item) => item.productId === productId);

    try {
      // Wait for the quantity update to complete
      await handleUpdateQuantity(productId, item.quantity + 1, isDbCart);

      // Update the toast to show success
    } catch (error) {}
  };

  const handleDecrease = async (productId, isDbCart) => {
    const item = isDbCart
      ? dbCart.find((item) => item._id === productId)
      : localCart.find((item) => item.productId === productId);

    try {
      // Wait for the quantity update to complete
      await handleUpdateQuantity(productId, item.quantity - 1, isDbCart);

      // Update the toast to show success
      toast.update(toastId, {
        render: "Quantity decreased successfully!",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      // Show an error toast if something goes wrong
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    // const toastId = toast.loading("Removing item from cart...");
    const isDbItem = dbCart.some((item) => item._id === itemToRemove);

    try {
      if (isDbItem) {
        const updatedCart = dbCart.filter((item) => item._id !== itemToRemove);

        if (userInfo && userInfo.token) {
          const userData = await fetchUserData();
          if (!userData || !userData._id) {
            throw new Error("Failed to fetch user information.");
          }

          const mongoUserId = userData._id;
          const url = `https://qdore-backend-final-final-last.vercel.app/api/cart/${mongoUserId}/remove/${itemToRemove}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }

          setDbCart(updatedCart);
        }
      } else {
        const updatedCart = localCart.filter(
          (item) => item.productId !== itemToRemove
        );
        setLocalCart(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      }

      toast.update(toastId, {
        render: "Item removed successfully!",
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: `Failed to remove item: ${error.message}`,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 3000,
      });
      setError("Error removing item: " + error.message);
    } finally {
      setIsRemoving(false);
      setIsModalOpen(false);
      setItemToRemove(null);
    }
  };
  const saveLocalCartToDB = async (mongoUserId) => {
    const token = userInfo?.token;
    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    for (const item of localCart) {
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
              productId: item.productId,
              name: item.name,
              price: Number(item.price),
              image: item.image,
              quantity: item.quantity,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add item to cart in database");
        }
      } catch (error) {
        toast.error("Failed to add item to cart in database: " + error.message);
      }
    }

    // Clear local storage cart after saving to DB
    localStorage.removeItem("cartItems");
    setLocalCart([]);
  };

  const handleBuyNow = async () => {
    if (!userInfo) {
      // Save current cart to localStorage before redirecting
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...dbCart, ...localCart])
      );
      // Redirect to auth page
      navigate("/auth", { state: { redirectTo: "/cart" } });
    } else {
      // User is logged in, save local cart to DB if it exists
      if (localCart.length > 0) {
        const userData = await fetchUserData();
        if (!userData || !userData._id) {
          toast.error("Failed to fetch user information.");
          return;
        }
        await saveLocalCartToDB(userData._id);
      }
      // Proceed to OTP page
      navigate("/otp", {
        state: { redirectTo: "/orderAddress", cart: [...dbCart, ...localCart] },
      });
    }
  };

  const totalPrice = [...dbCart, ...localCart]
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const renderCartItems = (cartItems, isDbCart) => (
    <div className="lg:col-span-2 space-y-6">
      {cartItems.map((item) => {
        // Ensure price is a valid number, default to 0 if not
        const price =
          item.price != null ? Number(item.price).toFixed(2) : "0.00";
        const totalItemPrice = (item.price * item.quantity).toFixed(2);

        return (
          <div
            key={isDbCart ? item._id : item.productId}
            className="flex items-center bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover mr-6 rounded-md"
              onClick={() =>
                handleNavigation({ id: isDbCart ? item._id : item.productId })
              }
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h2>
              <p className="text-gray-700">Price: ₹{price}</p>
              <div className="flex items-center mt-4">
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition-colors"
                  onClick={() =>
                    handleDecrease(
                      isDbCart ? item._id : item.productId,
                      isDbCart
                    )
                  }
                >
                  <FaMinus size={12} />
                </button>
                <span className="mx-3 text-gray-700">{item.quantity}</span>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition-colors"
                  onClick={() =>
                    handleIncrease(
                      isDbCart ? item._id : item.productId,
                      isDbCart
                    )
                  }
                >
                  <FaPlus size={12} />
                </button>
                <button
                  className="ml-4 text-gray-500 hover:text-red-500 transition-colors"
                  onClick={() => {
                    setItemToRemove(isDbCart ? item._id : item.productId);
                    setIsModalOpen(true);
                  }}
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                ₹{totalItemPrice}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (!isInitialized || isLoading) {
    return (
      <>
        <Navbar />
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl mb-10 text-center font-bold text-gray-900">
          Your Shopping Cart
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {dbCart.length === 0 && localCart.length === 0 ? (
          <p className="text-center text-gray-700">
            Your cart is empty.{" "}
            <Link
              to="/ourCollection"
              className="text-black font-semibold hover:underline"
            >
              Continue shopping
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userInfo && dbCart.length > 0 && (
              <>{renderCartItems(dbCart, true)}</>
            )}
            {localCart.length > 0 && <>{renderCartItems(localCart, false)}</>}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-900 font-semibold">
                  ₹{totalPrice}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700">Shipping:</span>
                <span className="text-gray-900 font-semibold">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
              <button
                onClick={handleBuyNow}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRemove}
        message="Are you sure you want to remove this item from your cart?"
        isLoading={isRemoving}
      />
      <ToastContainer position="bottom-right" />
      <Footer />
    </>
  );
};

export default Cart;
