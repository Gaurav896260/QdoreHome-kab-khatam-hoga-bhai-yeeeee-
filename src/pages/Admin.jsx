import React, { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaShippingFast, FaTruckLoading, FaCheck } from 'react-icons/fa';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Admin = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: 'VIRGO SIDE TABLE',
      customerName: 'John Doe',
      status: 'packed',
      price: '99.99',
      quantity: 2,
    },
    {
      id: 2,
      productName: 'ORBIT SIDE TABLE',
      customerName: 'Jane Smith',
      status: 'out for shipping',
      price: '89.99',
      quantity: 1,
    },
    {
      id: 3,
      productName: 'PLUTO SIDE TABLE',
      customerName: 'Mike Johnson',
      status: 'shipped',
      price: '79.99',
      quantity: 3,
    },
    {
      id: 4,
      productName: 'VEGA SIDE TABLE',
      customerName: 'Emily Davis',
      status: 'out for delivery',
      price: '119.99',
      quantity: 1,
    },
    {
      id: 5,
      productName: 'ACACIA WOOD SIDE TABLE',
      customerName: 'Chris Wilson',
      status: 'delivered',
      price: '69.99',
      quantity: 2,
    },
  ]);

  const statusOptions = ['packed', 'out for shipping', 'shipped', 'out for delivery', 'delivered'];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'packed':
        return <FaBox className="text-yellow-500" />;
      case 'out for shipping':
        return <FaTruckLoading className="text-blue-500" />;
      case 'shipped':
        return <FaShippingFast className="text-purple-500" />;
      case 'out for delivery':
        return <FaTruck className="text-orange-500" />;
      case 'delivered':
        return <FaCheck className="text-green-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  useEffect(() => {
    // Placeholder for an API call to fetch orders
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Product Name</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.productName}</td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">${order.price}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">${(order.price * order.quantity).toFixed(2)}</td>
                  <td className="py-3 px-4 flex items-center">
                    {getStatusIcon(order.status)}
                    <select
                      className="ml-2 border border-gray-300 rounded-md p-1"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
