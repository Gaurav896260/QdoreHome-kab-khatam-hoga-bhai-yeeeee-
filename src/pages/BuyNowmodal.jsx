import React from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmationModal = ({ isOpen, onClose, orderDetails }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;
  const order = orderDetails.order;

  if (!order) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Processing Order...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="text-center">
          <div className="text-4xl text-green-500 mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Order Placed Successfully!
          </h2>

          <div className="text-left space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="font-semibold">Order ID:</p>
              <p className="text-gray-600">{order._id}</p>

              <p className="font-semibold">Order Date:</p>
              <p className="text-gray-600">{formatDate(order.createdAt)}</p>

              <p className="font-semibold">Order Status:</p>
              <p className="text-gray-600">{order.orderStatus}</p>

              <p className="font-semibold">Payment Method:</p>
              <p className="text-gray-600">{order.paymentMethod}</p>

              <p className="font-semibold">Payment Status:</p>
              <p className="text-gray-600">{order.paymentStatus}</p>

              <p className="font-semibold">Total Amount:</p>
              <p className="text-gray-600">{formatPrice(order.totalAmount)}</p>

              <p className="font-semibold">Shipment ID:</p>
              <p className="text-gray-600">{order.shiprocketOrderId}</p>
            </div>

            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Shipping Address:</p>
              <p className="text-sm text-gray-600">
                {order.address.line1}
                <br />
                {order.address.line2}
                <br />
                {order.address.city}, {order.address.state}
                <br />
                {order.address.postalCode}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Order Items:</p>
              <div className="space-y-3">
                {order.products.map((product) => (
                  <div key={product._id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{product.price} x {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGoHome}
            className="mt-6 px-4 py-2 bg-black text-white rounded transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
