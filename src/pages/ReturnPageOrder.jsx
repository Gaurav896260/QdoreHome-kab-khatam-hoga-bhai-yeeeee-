import React, { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

// Define return reasons
const returnReasons = [
  "Bought by Mistake",
  "Better price available",
  "Performance or quality not adequate",
  "Incompatible or not useful",
  "Product damaged, but shipping box OK",
  "Item arrived too late",
  "Missing parts or accessories",
  "Both product and shipping box damaged",
  "Wrong item was sent",
  "Item defective or doesn't work",
  "No longer needed",
  "Didn't approve purchase",
  "Inaccurate website description",
  "Other",
  "Changed my mind",
  "Does not fit",
  "Size not as expected",
  "Item is damaged",
  "Received wrong item",
  "Parcel damaged on arrival",
  "Quality not as expected",
  "Missing Item or accessories",
  "Performance not adequate",
  "Arrived too late",
  "Order Not Received",
  "Empty Package",
  "Incorrect Item Delivered",
];
export const ReturnOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [returnReason, setReturnReason] = useState("");
  const [filteredReasons, setFilteredReasons] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [returnDetails, setReturnDetails] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setReturnReason(input);
    setFilteredReasons(
      input
        ? returnReasons.filter((reason) =>
          reason.toLowerCase().includes(input.toLowerCase())
        )
        : []
    );
    setShowDropdown(!!input);
  };

  const handleSelectReason = (reason) => {
    setReturnReason(reason);
    setShowDropdown(false);
  };

  const handleReturnOrder = async () => {
    try {
      const token = userInfo.token;
      const response = await axios.patch(
        `https://qdore-backend-final-final-last.vercel.app/api/orders/${orderId}/return`,
        { reason: returnReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Return order response:", response.data); // Debug log

      if (
        response.data &&
        response.data.message === "Return order created successfully."
      ) {
        setReturnDetails(response.data.data);
        setShowSuccessModal(true);
        console.log("Success modal should be visible"); // Debug log
      } else {
        toast.error("Order return failed. Unexpected response format.");
      }
    } catch (error) {
      console.error("Return order error:", error); // Debug log
      toast.error("Failed to return the order:", `${error.message}`);
    }
  };

  const closeModal = useCallback(() => {
    console.log("Closing modal and navigating to profile"); // Debug log
    setShowSuccessModal(false);
    navigate("/profile");
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-md p-8">
          <h1 className="text-3xl font-semibold mb-6 text-gray-900 font-poppins">
            Return Order
          </h1>
          <div className="relative mb-4">
            <textarea
              className="border border-gray-300 w-full p-3 rounded-md focus:outline-none focus:ring focus:border-gray-500 text-gray-700 placeholder-gray-400 font-lora text-base"
              placeholder="Enter reason for return"
              value={returnReason}
              onChange={handleInputChange}
            />
            {showDropdown && filteredReasons.length > 0 && (
              <ul className="absolute bg-white border border-gray-200 w-full max-h-60 overflow-y-auto shadow-lg z-10 mt-1">
                {filteredReasons.map((reason, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-gray-700 font-lora"
                    onClick={() => handleSelectReason(reason)}
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleReturnOrder}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-200 font-poppins"
          >
            Submit Return Request
          </button>

          {returnDetails && (
            <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-md">
              <h2 className="font-semibold text-blue-800">
                Return Order Details
              </h2>
              <p>
                <strong>Order ID:</strong> {returnDetails.order_id}
              </p>
              <p>
                <strong>Shipment ID:</strong> {returnDetails.shipment_id}
              </p>
              <p>
                <strong>Status:</strong> {returnDetails.status}
              </p>
              <p>
                <strong>Company Name:</strong> {returnDetails.company_name}
              </p>
            </div>
          )}
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-75"></div>
            <div className="bg-white rounded-lg shadow-2xl p-8 w-96 relative border-4 border-green-600 z-50">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-700 hover:text-red-600 focus:outline-none transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <div className="text-center">
                <svg
                  className="mx-auto mb-4 w-20 h-20 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h2 className="text-3xl font-bold text-green-700 mb-4">
                  Return Request Successful!
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Your return request has been initiated successfully.
                </p>
                <button
                  onClick={closeModal}
                  className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200 font-poppins text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Close and Go to Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReturnOrderPage;