import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx'; // Import your Navbar component
import Footer from '../components/Footer/Footer.jsx'; // Import your Footer component

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10 px-5">
        <div className="max-w-5xl mx-auto bg-white p-8 shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Purpose & Scope</h2>
            <p className="text-gray-700 text-lg">
              Qdore Home (Company) is committed to protecting the privacy and security of personal data collected, used, and stored in accordance with the Information Technology (Intermediaries Guidelines) Rules, 2011 and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 ('the SPDI Rules'). This Privacy Policy outlines our principles and practices regarding the collection, processing, storage, and disclosure of personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Collection of Personal Information</h2>
            <p className="text-gray-700 text-lg">
              1.1. Company may collect the following categories of personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>Contact Information: such as name, email address, phone number, postal address.</li>
              <li>Sensitive Personal Information: including financial information, medical information, biometric data.</li>
              <li>Usage information: such as the pages you visit on our website and the products you view.</li>
              <li>Employees Personal Information: Passwords, Bank Account details, Biometric data, etc.</li>
            </ul>

            <p className="text-gray-700 mt-4 text-lg">
              1.2. We collect personal information through various means, including when you provide it to us directly or when it is automatically collected through our website or application.
            </p>

            <p className="text-gray-900 mt-4 text-lg">
              1.3. Circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>When you visit, browse and/or use the Platform.</li>
              <li>When you contact our team through the Platform.</li>
              <li>When you apply for a job through Careers section.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use of Personal Information</h2>
            <p className="text-gray-700 text-lg">2.1. We use personal information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>Providing and improving our services.</li>
              <li>Communicating with you, responding to your inquiries, and providing customer support.</li>
              <li>Complying with applicable laws and regulations.</li>
              <li>To comply with a court order or government regulation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-gray-700 text-lg">
              We use "Cookies" on our websites, which are small text files stored on your devices to help us better understand user behavior and improve navigation. You can configure your browser to refuse Cookies, but certain features may not work as intended without them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Disclosure of Personal Information</h2>
            <p className="text-gray-700 text-lg">
              3.1. We may disclose personal information to service providers, legal authorities, or in case of business transfers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Protection of Personal Information</h2>
            <p className="text-gray-700 text-lg">
              4.1. We implement reasonable security measures like encryption and firewalls to protect personal information from unauthorized access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Rights and Choices</h2>
            <ul className="list-disc list-inside text-gray-700 text-lg">
              <li>You have the right to access, correct, or delete your personal information.</li>
              <li>You can object to processing your data for certain purposes, like marketing.</li>
              <li>You can withdraw consent for the collection or processing of your personal data at any time.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Links and Services</h2>
            <p className="text-gray-700 text-lg">
              6.1. Our services may contain links to third-party websites. This Privacy Policy does not apply to those third parties, and we encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to this Policy</h2>
            <p className="text-gray-700 text-lg">
              7.1. We may update this Policy from time to time. Any changes will be effective upon posting the revised Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 text-lg">
              If you have any questions or concerns about this Policy, please contact us at admin@qdorehome.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
