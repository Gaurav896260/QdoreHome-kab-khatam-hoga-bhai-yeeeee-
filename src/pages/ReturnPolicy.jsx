import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx'; // Import your Navbar component
import Footer from '../components/Footer/Footer.jsx'; // Import your Footer component

const ReturnPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10 px-5">
        <div className="max-w-5xl mx-auto bg-white p-8 shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Return & Refund Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            <p className="text-gray-700 text-lg">
              We offer a 7 days Return & Exchange Policy. In the unlikely case where the product received is not in its intended condition, is damaged, or missing parts at the time of delivery, such an item should be reported within 7 days of receipt.
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Please retain the original packaging of the product to ship it back to us safely. We will arrange for a replacement of the same article. We'll share a pickup label with you, which should be printed and pasted on the original packaging before handing it out to the pickup executive.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refunds (if applicable)</h2>
            <p className="text-gray-700 text-lg">
              We offer returns on articles that cannot be replaced. Once the product is received and inspected for eligible returns, we will send you an email notifying you that a refund has been initiated.
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Your refund will be processed in your original method of payment within 3-5 working days from the receipt of the returned item.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Late or Missing Refunds (if applicable)</h2>
            <p className="text-gray-700 text-lg">
              If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, as it may take some time before your refund is officially posted.
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Next, contact your bank. There is often some processing time before a refund is posted. If you’ve done all of this and you still have not received your refund yet, please contact us at <a href="mailto:support@qdorehome.com" className="text-blue-500 hover:underline">support@qdorehome.com</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p className="text-gray-700 text-lg">
              We only replace items if they are defective or damaged. If you need to exchange it for the same reason, send us an email at <a href="mailto:support@qdorehome.com" className="text-blue-500 hover:underline">support@qdorehome.com</a> within 7 days from receiving the product.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnPolicy;
