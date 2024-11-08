import React from "react";

const Banner = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0 ">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-lora text-center font-bold bg-heading-gradient bg-clip-text text-transparent mt-20 mb-20">
          WHY CHOOSE US?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
          {/* Box 1 */}
          <div
            data-aos="zoom-in"
            className="flex flex-col items-center justify-center bg-white shadow-2xl p-8 rounded-lg group transition duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8AA6A3]/40 hover:bg-[#f9f9f9]"
          >
            <p className="text-lg font-semibold text-center">Quality Products</p>
          </div>

          {/* Box 2 */}
          <div
            data-aos="zoom-in"
            className="flex flex-col items-center justify-center bg-white shadow-2xl p-8 rounded-lg group transition duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8AA6A3]/40 hover:bg-[#f9f9f9]"
          >
            <p className="text-lg font-semibold text-center">Fast Delivery</p>
          </div>

          {/* Box 3 */}
          <div
            data-aos="zoom-in"
            className="flex flex-col items-center justify-center bg-white shadow-2xl p-8 rounded-lg group transition duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8AA6A3]/40 hover:bg-[#f9f9f9]"
          >
            <p className="text-lg font-semibold text-center">Easy Payment</p>
          </div>

          {/* Box 4 */}
          <div
            data-aos="zoom-in"
            className="flex flex-col items-center justify-center bg-white shadow-2xl p-8 rounded-lg group transition duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#8AA6A3]/40 hover:bg-[#f9f9f9]"
          >
            <p className="text-lg font-semibold text-center">Get Offers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
