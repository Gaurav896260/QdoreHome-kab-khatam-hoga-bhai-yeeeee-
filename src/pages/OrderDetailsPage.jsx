import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ChevronLeft,
  Package,
  Truck,
  Download,
  X,
  AlertTriangle,
  Undo,
} from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 flex items-center font-serif">
          <AlertTriangle className="mr-2 text-gray-700" />
          Confirm Cancellation
        </h2>
        <p className="mb-6 font-sans">
          Are you sure you want to cancel this order? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300 font-sans"
          >
            No, Keep Order
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition duration-300 font-sans"
          >
            Yes, Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shiprocketStatus, setShiprocketStatus] = useState("NEW");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = userInfo.token;
        const { data } = await axios.get(
          `https://qdore-backend-final-final-last.vercel.app/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrder(data);
        console.log("sdkjbsdjbsd", orderId);
        // Fetch Shiprocket status
        const shiprocketResponse = await axios.get(
          `https://qdore-backend-final-final-last.vercel.app/api/orders/${orderId}/shiprocketresponse`
        );
        // Set the order's shiprocketStatus based on the API response
        setShiprocketStatus(shiprocketResponse.data.data.orderDetails.status);
        setOrder((prevOrder) => ({
          ...prevOrder,
          shiprocketStatus: shiprocketResponse.data.status,
        }));
      } catch (error) {
        setError("");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();

    // Set up interval to check every 3 hours
    const intervalId = setInterval(fetchOrderDetails, 3 * 60 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [orderId, userInfo.token]);

  const handleCancelOrder = async () => {
    const token = userInfo.token;
    try {
      const response = await axios.patch(
        `https://qdore-backend-final-final-last.vercel.app/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 200 &&
        response.data.message?.toLowerCase() ===
        "order has been canceled successfully"
      ) {
        toast.success("Order canceled successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        // Update local state
        setOrder((prevOrder) => ({
          ...prevOrder,
          shiprocketStatus: "CANCELED",
        }));
      } else {
        toast.error(
          `Failed to cancel the order: ${response.data.message || "Unknown error"
          }`,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error canceling the order";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDownloadInvoice = async (orderId) => {
    try {
      const token = userInfo.token;
      const response = await axios.post(
        `https://qdore-backend-final-final-last.vercel.app/api/orders/${orderId}/invoice`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { is_invoice_created, invoice_url } = response.data;

      if (is_invoice_created && invoice_url) {
        const link = document.createElement("a");
        link.href = invoice_url;
        link.target = "_blank"; // Open in new tab
        link.download = `Invoice_${orderId}.pdf`; // Set the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Invoice downloaded successfully", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        toast.error("Failed to generate invoice or invoice not created.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error downloading invoice:", error.message);
      toast.error("Error downloading invoice. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const renderActionButtons = () => {
    if (!order) return null;

    const buttons = [];
    // setShiprocketStatus("CANCELED");

    buttons.push(
      <button
        key="back"
        onClick={() => navigate("/profile")}
        className="flex items-center px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 font-sans"
      >
        <ChevronLeft className="mr-2" /> Back to Orders
      </button>
    );
    switch (shiprocketStatus) {
      case "NEW":
        buttons.push(
          <button
            key="track"
            onClick={() => navigate(`/track-order/${orderId}`)}
            className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 font-sans"
          >
            <Truck className="mr-2" /> Track Order
          </button>,
          <button
            key="cancel"
            onClick={openModal}
            className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 font-sans"
          >
            <X className="mr-2" /> Cancel Order
          </button>,
          <button
            key="invoice"
            onClick={() => handleDownloadInvoice(orderId)}
            className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300 font-sans"
          >
            <Download className="mr-2" /> Download Invoice
          </button>
        );
        break;
      case "CANCELED":
        buttons.push(
          <button
            key="invoice"
            onClick={() => handleDownloadInvoice(orderId)}
            className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300 font-sans"
          >
            <Download className="mr-2" /> Download Invoice
          </button>
        );
        break;
      case "RETURN PENDING":
        buttons.push(
          <button
            key="cancel"
            onClick={openModal}
            className="flex items-center px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 font-sans"
          >
            <X className="mr-2" /> Cancel Order
          </button>,
          <button
            key="track"
            onClick={() => navigate(/track-order/`${orderId}`)}
            className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 font-sans"
          >
            <Truck className="mr-2" /> Track Order
          </button>,
          <button
            key="invoice"
            onClick={() => handleDownloadInvoice(orderId)}
            className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300 font-sans"
          >
            <Download className="mr-2" /> Download Invoice
          </button>
        );
        break;
      default:
        // For any other status, including "SHIPPED"
        buttons.push(
          <button
            key="track"
            onClick={() => navigate(/track-order/`${orderId}`)}
            className="flex items-center px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-300 font-sans"
          >
            <Truck className="mr-2" /> Track Order
          </button>,
          <button
            key="invoice"
            onClick={() => handleDownloadInvoice(orderId)}
            className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300 font-sans"
          >
            <Download className="mr-2" /> Download Invoice
          </button>,

          <button
          key="track"
          onClick={() => navigate(/return-order/`${orderId}`)}
          className="flex items-center px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition duration-300 font-sans"
        >
          <Truck className="mr-2" /> Return
        </button>

        );
    }

    return buttons;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center text-xl mt-10 font-serif">
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 font-sans">
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-gray-900 text-white p-6">
              <h1 className="text-3xl font-bold font-serif">Order Details</h1>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 font-serif">
                  Order Date: {formatDate(order.createdAt)}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${order.shiprocketStatus === "CANCELED"
                      ? "bg-red-100 text-red-800"
                      : order.shiprocketStatus === "NEW"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    } font-sans`}
                >
                  {order.shiprocketStatus === "NEW"
                    ? "Processing"
                    : order.shiprocketStatus}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center font-serif">
                  <Package className="mr-2" /> Products
                </h2>
                <div className="space-y-4">
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center bg-gray-50 p-4 rounded-lg"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="font-semibold font-serif">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 font-sans">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-sm font-semibold font-sans">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xl font-bold mt-4 text-right font-serif">
                  Total: ₹{order.totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center font-serif">
                  <Truck className="mr-2" /> Shipping Address
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg font-sans">
                  <p>{order.address.line1}</p>
                  {order.address.line2 && <p>{order.address.line2}</p>}
                  <p>
                    {order.address.city}, {order.address.state} -{" "}
                    {order.address.postalCode}
                  </p>
                  <p>{order.address.country}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                {renderActionButtons()}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleCancelOrder}
        />
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailPage;
