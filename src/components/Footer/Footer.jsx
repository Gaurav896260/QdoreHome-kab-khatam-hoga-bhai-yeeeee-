import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin, FaAmazon, FaPhoneAlt, FaMapMarkerAlt, FaEnvelopeSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logoImp2.png";

const Footer = () => {
  const [isOpen, setIsOpen] = useState({
    categories: false,
    bestsellers: false,
    aboutUs: false,
    help: false,
  });

  const navigate = useNavigate();

  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <footer className="bg-black text-white py-10 px-5">
      {/* Large Screens Layout */}
      <div className="hidden lg:grid w-full max-w-none mx-0 grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Logo Centered */}
        <div className="col-span-1 flex justify-center items-center">
          <img src={logo} alt="Company Logo" className="w-60" />
        </div>

        {/* Contact Us Section */}
        <div className="col-span-1">
          <p className="mb-2 font-bold text-xl">Contact Us</p>
          <div className="flex space-x-4 mb-5 mt-5">
            {/* Social Media Icons */}
            <div className="relative group">
              <a href="https://www.facebook.com/profile.php?id=61560626668033&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
              </a>
              <span className="absolute left-0 bottom-6 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
            </div>
            <div className="relative group">
              <a href="https://www.instagram.com/qdorehome?igsh=M21uZ3hhb251a2c2" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-gray-400 cursor-pointer" />
              </a>
              <span className="absolute left-0 bottom-6 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
            </div>
            <div className="relative group">
              <a href="https://www.linkedin.com/company/qdore-home/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="hover:text-gray-400 cursor-pointer" />
              </a>
              <span className="absolute left-0 bottom-6 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
            </div>
            <div className="relative group">
              <a href="https://www.amazon.in/dp/B0DDC5HDTD" target="_blank" rel="noopener noreferrer">
                <FaAmazon className="hover:text-gray-400 cursor-pointer" />
              </a>
              <span className="absolute left-0 bottom-6 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">Amazon</span>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <FaPhoneAlt className="mr-2" />
            <p className="text-sm">+91 7983131615</p>
          </div>
          <div className="flex items-center mt-5">
            <FaEnvelopeSquare className="mr-2" />
            <p className="text-sm">admin@qdorehome.com</p>
          </div>
          <div className="flex items-center mt-5">
            <FaMapMarkerAlt className="mr-2" />
            <p className="text-sm">Qdore Home <br /> Quality Collection Inc <br /> Lakri Fazalpur, Delhi Road <br /> Moradabad (UP) 244001, India</p>
          </div>
        </div>

        {/* Top Categories and Bestsellers */}
        <div className="col-span-1">
          <h4 className="font-bold text-xl mb-2">Top Categories</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer" onClick={() => navigate('/furniture')}>Furniture</li>
            <li className="cursor-pointer" onClick={() => navigate('/decor')}>Decor</li>
            <li className="cursor-pointer" onClick={() => navigate('/servewares')}>Servewares</li>
            <li className="cursor-pointer" onClick={() => navigate('/plantersandvases')}>Planters & Vases</li>
          </ul>
          <h4 className="font-bold text-xl mt-6 mb-2">Bestsellers</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer" onClick={() => navigate('/woodenCollection')}>Wooden Collection</li>
            <li className="cursor-pointer" onClick={() => navigate('/mercuryCollection')}>Mercury Collection</li>
          </ul>
        </div>

        {/* About Us Section */}
        <div className="col-span-1">
          <h4 className="font-bold text-xl mb-2">About Us</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer" onClick={() => navigate('/contactUs')}>Contact Us</li>
            <li className="cursor-pointer" onClick={() => navigate('/ourStory')}>Our Story</li>
            <li className="cursor-pointer" onClick={() => navigate('/b2b')}>Collaborate With Us</li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="col-span-1">
          <h4 className="font-bold text-xl mb-2">Help</h4>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer" onClick={() => navigate('/auth')}>Login/Register</li>
            <li className="cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
            <li className="cursor-pointer" onClick={() => navigate('/termsandconditions')}>Terms & Conditions</li>
            <li className="cursor-pointer" onClick={() => navigate('/privacypolicy')}>Privacy Policy</li>
            <li className="cursor-pointer" onClick={() => navigate('/shippingpolicy')}>Shipping Policy</li>
            <li className="cursor-pointer" onClick={() => navigate('/returnpolicy')}>Return Policy</li>
          </ul>
        </div>
      </div>

      {/* Small Screens Layout */}
      <div className="lg:hidden flex flex-col items-center">
        {/* Logo Centered */}
        <img src={logo} alt="Company Logo" className="w-40 mb-6" />

        {/* Contact Us */}
        <div className="text-center mb-10 mt-10">
          <p className="font-bold font-roboto text-2xl">Contact Us</p>
          <div className="flex justify-center space-x-4 mt-6 mb-6">
            {/* Social Media Icons */}
            <a href="https://www.facebook.com/profile.php?id=61560626668033&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-gray-400 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/qdorehome?igsh=M21uZ3hhb251a2c2" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-400 cursor-pointer" />
            </a>
            <a href="https://www.linkedin.com/company/qdore-home/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-400 cursor-pointer" />
            </a>
            <a href="https://www.amazon.in/dp/B0DDC5HDTD" target="_blank" rel="noopener noreferrer">
              <FaAmazon className="hover:text-gray-400 cursor-pointer" />
            </a>
          </div>
          <div className="mt-4">
            <p className="text-xl font-roboto"><FaPhoneAlt className="inline mr-2" />+91 7983131615</p>
            <p className="text-xl font-roboto mt-2"><FaEnvelopeSquare className="inline mr-2" />admin@qdorehome.com</p>
            <p className="text-xl font-roboto mt-2"><FaMapMarkerAlt className="inline mr-2" />Qdore Home <br />Quality Collection Inc <br />Lakri Fazalpur, Delhi Road  <br />Moradabad (UP) 244001, India</p>
          </div>
        </div>

        {/* Toggleable Sections for Small Screens */}
        <div className="w-full p-10">
          {/* Top Categories */}
          <div className="mb-4">
            <button onClick={() => toggleSection('categories')} className="text-xl font-bold font-roboto flex justify-between items-center w-full">
              Top Categories
              <span className="text-2xl">{isOpen.categories ? '-' : '+'}</span>
            </button>
            {isOpen.categories && (
              <ul className="space-y-2 text-lg font-roboto mt-2">
                <li className="cursor-pointer" onClick={() => navigate('/furniture')}>Furniture</li>
                <li className="cursor-pointer" onClick={() => navigate('/decor')}>Decor</li>
                <li className="cursor-pointer" onClick={() => navigate('/servewares')}>Servewares</li>
                <li className="cursor-pointer" onClick={() => navigate('/plantersandvases')}>Planters & Vases</li>
              </ul>
            )}
          </div>

          {/* Bestsellers */}
          <div className="mb-4">
            <button onClick={() => toggleSection('bestsellers')} className="text-xl font-bold font-roboto flex justify-between items-center w-full">
              Bestsellers
              <span className="text-2xl">{isOpen.bestsellers ? '-' : '+'}</span>
            </button>
            {isOpen.bestsellers && (
              <ul className="space-y-2 text-lg font-roboto mt-2">
                <li className="cursor-pointer" onClick={() => navigate('/woodenCollection')}>Wooden Collection</li>
                <li className="cursor-pointer" onClick={() => navigate('/mercuryCollection')}>Mercury Collection</li>
              </ul>
            )}
          </div>

          {/* About Us */}
          <div className="mb-4">
            <button onClick={() => toggleSection('aboutUs')} className="text-xl font-bold font-roboto flex justify-between items-center w-full">
              About Us
              <span className="text-2xl">{isOpen.aboutUs ? '-' : '+'}</span>
            </button>
            {isOpen.aboutUs && (
              <ul className="space-y-2 text-lg font-roboto mt-2">
                <li className="cursor-pointer" onClick={() => navigate('/contactUs')}>Contact Us</li>
                <li className="cursor-pointer" onClick={() => navigate('/ourStory')}>Our Story</li>
                <li className="cursor-pointer" onClick={() => navigate('/b2b')}>Collaborate With Us</li>
              </ul>
            )}
          </div>

          {/* Help */}
          <div className="mb-4">
            <button onClick={() => toggleSection('help')} className="text-xl font-bold font-roboto flex justify-between items-center w-full">
              Help
              <span className="text-2xl">{isOpen.help ? '-' : '+'}</span>
            </button>
            {isOpen.help && (
              <ul className="space-y-2 text-lg font-roboto  mt-2">
                <li className="cursor-pointer" onClick={() => navigate('/auth')}>Login/Register</li>
                <li className="cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
                <li className="cursor-pointer" onClick={() => navigate('/termsandconditions')}>Terms & Conditions</li>
                <li className="cursor-pointer" onClick={() => navigate('/privacypolicy')}>Privacy Policy</li>
                <li className="cursor-pointer" onClick={() => navigate('/shippingpolicy')}>Shipping Policy</li>
                <li className="cursor-pointer" onClick={() => navigate('/returnpolicy')}>Return Policy</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
