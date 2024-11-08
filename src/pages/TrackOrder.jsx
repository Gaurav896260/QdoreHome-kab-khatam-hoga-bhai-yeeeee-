import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Package, Truck, MapPin, Clock } from "lucide-react";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!userInfo || !userInfo.token) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }
      try {
        const token = userInfo.token;
        const { data } = await axios.get(
          `https://qdore-backend-final-final-last.vercel.app/api/orders/${orderId}/track`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Corrected syntax
            },
          }
        );
        console.log("Tracking Info:", data);
        setTrackingInfo(data);
      } catch (error) {
        setError("Error fetching tracking information");
        console.error("Error fetching tracking information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingInfo();
  }, [orderId, userInfo.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  const trackingHistory = trackingInfo?.history || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold flex items-center">
              <Package className="mr-3" /> Track Your Order
            </h1>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Order #{orderId}
            </h2>
            {trackingInfo ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-700">
                      <Truck className="mr-2" /> Status
                    </h3>
                    <p className="text-gray-600">{trackingInfo.status}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-700">
                      <Clock className="mr-2" /> Estimated Delivery
                    </h3>
                    <p className="text-gray-600">
                      {trackingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Tracking History
                </h3>
                <div className="space-y-4">
                  {trackingHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow"
                    >
                      <div className="flex items-start">
                        <MapPin className="mr-3 text-gray-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {entry.location}
                          </p>
                          <p className="text-sm text-gray-600">
                            {entry.timestamp}
                          </p>
                          <p className="mt-1 text-gray-700">{entry.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                No tracking information available.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrderPage;