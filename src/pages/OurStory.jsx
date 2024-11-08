import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
import { FaWhatsapp, FaArrowUp, FaAward, FaDollarSign, FaThLarge, FaTruck, FaInfoCircle, FaLightbulb, FaBullseye, FaHandHoldingHeart, FaStar, FaHome } from "react-icons/fa";
import { IoDiamond } from 'react-icons/io5';
import FounderImage from '../assets/founderMain.jpg'; // Add your founder's image path
import Footer from '../components/Footer/Footer';
import Popup from '../components/Popup/Popup';
import image from "../assets/logoContact.png";
import WhoWeAreImg from '../assets/story1.jpg'; // Replace with your actual image paths
import WhatWeDoImg from '../assets/story2.jpg';
import WhyDifferentImg from '../assets/story3.jpg'
import { MdCurrencyRupee } from "react-icons/md";

const OurStory = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const handleMouseEnter = (e) => {
    e.currentTarget.classList.remove('animated-icon');
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.classList.add('animated-icon');
  };

  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white'>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <div className="container mx-auto mt-5 mb-12 px-4">
        {/* Who We Are, What We Do, Why Different */}
        <div className="flex flex-col lg:flex-row justify-center mb-12 space-y-10 lg:space-y-0 lg:space-x-10">
          <div className="text-center lg:w-1/3 w-full">
            <img src={WhoWeAreImg} alt="Who We Are" className="mx-auto h-50 w-full object-cover rounded-lg" />
            <h2 className="text-4xl  font-lora font-bold bg-heading-gradient bg-clip-text text-transparent whitespace-nowrap mt-5">Who we are</h2>
            <p className="text-lg text-center lg:text-base mt-5">
            Qdore Home is a premier destination for exquisite home decor & accent furniture, offering a wide range of finest-quality articles to elevate the style and comfort of your living spaces. Our parent company, Quality Exports have been manufacturing Home Decor articles for several renowned international home decor retailers (since 2005) and now we have taken this step to launch Qdore Home, as the one stop solution for all kinds of home decor needs for Indian households at affordable prices.
            </p>
          </div>
          <div className="text-center lg:w-1/3 w-full">
            <img src={WhatWeDoImg} alt="What We Do" className="mx-auto h-50 w-full object-cover rounded-lg" />
            <h2 className="text-4xl  font-lora font-bold bg-heading-gradient bg-clip-text text-transparent whitespace-nowrap mt-5">What we do</h2>
            <p className="text-lg text-center lg:text-base mt-5">
            At Qdore Home, we believe in creating spaces achieving functionality through our products in various product categories. With the belief in “Made in India” campaign, all our products our designed and manufactured through our own team of designers & craftsmen at our in-house manufacturing unit. This not only supports local Indian artisans, but also helps us to achieve the finest quality with a thorough check on sustainability.
            </p>
          </div>
          <div className="text-center lg:w-1/3 w-full">
            <img src={WhyDifferentImg} alt="Why We're Different" className="mx-auto h-85 w-full object-cover rounded-lg" />
            <h2 className="text-4xl font-lora font-bold bg-heading-gradient bg-clip-text text-transparent whitespace-nowrap mt-5">Why we're different</h2>
            <p className="text-lg text-center lg:text-base mt-5">
            Qdore Home is a premier destination for exquisite home decor & accent furniture, offering a wide range of finest-quality articles to elevate the style and comfort of your living spaces. Our parent company, Quality Exports have been manufacturing Home Decor articles for several renowned international home decor retailers (since 2005) and now we have taken this step to launch Qdore Home, as the one stop solution for all kinds of home decor needs for Indian households at affordable prices.
            </p>
          </div>
        </div>

        <div className="text-center mb-20 mt-20">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent">Why Choose Qdore Home?</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaAward className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 font-roboto">Legacy of Quality</h3>
            <p className="text-gray-600 text-lg font-roboto">
              Backed by Quality Exports' 15+ years of experience in supplying top-notch home decor internationally.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            < MdCurrencyRupee className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 font-roboto">Fair Pricing</h3>
            <p className="text-gray-600 text-lg font-roboto">
              Committed to offering lush home decor at prices that are fair and accessible.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaThLarge className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Wide Selection</h3>
            <p className="text-gray-600 text-lg font-roboto">
              A diverse range of home decor & accent furniture to suit every style and preference.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaTruck className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Convenience</h3>
            <p className="text-gray-600 text-lg font-roboto">
              An easy-to-navigate online platform that brings beautiful decor directly from the factory to your doorstep, with no middleman involvement.
            </p>
          </div>
        </div>
        <div className="text-center mb-20 mt-20">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent ">Message from the Founder</h1>
        </div>
        <div className="relative  rounded-lg mb-12 h-full">
          <div className="relative flex flex-col md:flex-row items-center md:items-center h-full">
            <div className="w-full md:w-1/2 flex justify-center items-center  mb-4 mt-3 md:mb-0">
              <img
                src={FounderImage}
                alt="Founder"
                className="rounded-3xl shadow-2xl w-full max-w-2xl h-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className=" md:w-1/2 md:pl-8 flex flex-col justify-center h-full">
              <h2 className="text-5xl font-roboto font-semibold mt-20 mb-12">Rmneek Sikka</h2>
              <p className="text-xl font-roboto">
                My journey with Qdore Home began with a desire to bring modern, high-quality home decor to Indian households, which are specifically Made-in-India by Indian artisans. After working in the export industry for 4 years, I realized that there was a gap in the market for stylish, yet affordable home goods in India.
              </p>
              <br />
              <p className="text-xl font-roboto">
                Qdore Home was born out of this passion. Our mission is to create beautiful, functional, and sustainable products that elevate your living space. From our initial concept to the final product, every step of the process is carefully overseen by our dedicated team. We believe in the power of design to transform your home into a sanctuary of style and comfort.
              </p>
              <br />
              <p className="text-xl font-roboto">
                We really want your home to reflect your unique taste and personality therefore we are committed to bring you a wide range of products of different design themes to match all kinds of interior concepts.              </p>
            </div>
          </div>
        </div>
        <div className="text-center mb-20 mt-20">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent">Our Vision and Mission</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaLightbulb className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Vision</h3>
            <p className="text-gray-600 text-lg font-roboto">
              Our aim is to go global and build an international homegrown brand from the Indian origin. Bringing Qdore Home to the world map will be the proudest moment for our team. To achieve the same, we give meticulous attention to detail, we choose finest quality materials and we make sure to provide the best at affordable prices. With a customer centric approach, we are committed to bring value to our clients.            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaBullseye className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Mission</h3>
            <p className="text-gray-600 text-lg font-roboto">
              To make stylish, high-quality home decor accessible to every Indian household. We strive to continuously innovate and curate a wide selection of furniture that enhances the beauty and functionality of homes, ensuring that each piece reflects the unique tastes of our customers.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IoDiamond className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Values</h3>
            <p className="text-gray-600 text-lg font-roboto">
              At Qdore Home, we are committed to minimizing our environmental impact by using sustainable materials and practices. From responsible sourcing to energy-efficient manufacturing, we strive to create products that are both stylish and eco-friendly. We believe in creating products that are built to last by ensuring quality craftsmanship            </p>
          </div>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent">Proudly Made in India</h1>
        </div>
        <div className="flex flex-col items-center mb-12  p-6 rounded-lg">
          <FaHome className="text-5xl mb-4 animate-bounce" />
          <p className="text-center text-lg font-roboto max-w-2xl">
            At Qdore Home, we are committed to the "Made in India" initiative, celebrating the rich heritage and craftsmanship of our country. Our products are crafted with the utmost care, using materials sourced locally, ensuring that each product not only enhances your home but also supports the Indian economy. By choosing Qdore Home, you are contributing to the growth and sustainability of local industries, reinforcing our nation's self-reliance and pride.
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaHandHoldingHeart className="text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Empowering Local Artisans</h3>
            <p className="text-gray-600 text-lg font-roboto">
              Qdore Home is dedicated to supporting local artisans, recognizing the immense talent and skill they bring to the table. Our collaboration with artisans from various regions of India ensures that their unique, traditional techniques are preserved and showcased. By offering fair wages and sustainable work opportunities, we empower these craftsmen and women, enabling them to continue their invaluable work and pass down their expertise to future generations.
            </p>
          </div>
          <div
            className="bg-white m-5 mb-8 p-6 rounded-lg shadow-lg w-80 hover:shadow-2xl transform hover:-translate-y-2 transition-all animated-icon"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaStar className=" text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-roboto font-semibold mb-2">Artistry at Your Doorstep</h3>
            <p className="text-gray-600 text-lg font-roboto">
              We take pride in bringing the high-skilled craftsmanship of artisans from all around India directly to your households. Each piece of furniture and decor item at Qdore Home is a testament to the meticulous artistry and dedication of our craftsmen. From intricate carvings to hand-painted designs, our products embody the rich cultural diversity and artistic heritage of India. Transform your living spaces with our unique, handcrafted pieces that tell a story of tradition, excellence, and passion.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 text-white bg-heading-gradient z-50 py-2 px-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaArrowUp size={20} />
      </button>

      <a
        href="https://api.whatsapp.com/send?phone=7983131615"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 bg-green-500 text-white py-2 px-4 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />

      </a>

      <style jsx>{`
        .text-navy {
          color: #001f3f;
        }
        .bg-navy {
          background-color: #001f3f;
        }
        .bg-grey {
          background-color: #f0f0f0;
        }
        .animated-icon {
          animation: pulse;
        }
        .animated-heading {
          animation: fadeIn 2s ease-in-out;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <Footer />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
}


export default OurStory;
