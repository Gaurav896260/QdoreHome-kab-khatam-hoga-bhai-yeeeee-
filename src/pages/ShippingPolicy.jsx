import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx'; // Import your Navbar component
import Footer from '../components/Footer/Footer.jsx'; // Import your Footer component

const ShippingPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10 px-5">
        <div className="max-w-5xl mx-auto bg-white p-8 shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Shipping Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Rates</h2>
            <p className="text-gray-700 text-lg">
              We offer free shipping pan India.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
            <p className="text-gray-700 text-lg">
              The tracking details and carrier information associated with your order will be provided when your order ships.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Time</h2>
            <p className="text-gray-700 text-lg">
              Items that are in stock and shipping from our warehouse are typically processed within 3 to 5 business days and should reach you in 7 to 14 days.
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Items that are made-to-order or customised will be commissioned by you when you place your order, and therefore will take longer to produce and ship. For more information, please write to us at <a href="mailto:support@qdorehome.com" className="text-blue-500 hover:underline">support@qdorehome.com</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Taxes & Custom Duties for Indian Orders</h2>
            <p className="text-gray-700 text-lg">
              Product prices displayed are inclusive of all taxes and duties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Important Information</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>Order cut-off times are provided as guidelines only, and do not take into account possible delays caused by payment authorisation.</li>
              <li>Estimated delivery times are to be used as a guide only and commence from the date of dispatch. We are not responsible for any delays caused by destination customs clearance processes.</li>
              <li>We are unable to redirect orders once items have been dispatched.</li>
              <li>All orders require a signature upon receipt.</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
