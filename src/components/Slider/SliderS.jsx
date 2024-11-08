import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider.css";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import image1 from "../../assets/Lifestyle/ClassicStarbust/classicStarbust2.jpeg";
import image2 from "../../assets/CandleHolders/ch2.jpg";
import image3 from "../../assets/CandleHolders/ch3.jpg";
import image4 from "../../assets/CandleHolders/ch4.jpg";
import image5 from "../../assets/CandleHolders/ch5.jpg";
import image6 from "../../assets/CandleHolders/ch6.jpg";
import image7 from "../../assets/CandleHolders/ch7.jpg";

const products = [
  {
    id: "classical-starburst-lanterns",
    heading: "THE CLASSICAL STARBURST LANTERNS",
    image: image1,
    price: "99.99",
  },
  {
    id: "starburst-lanterns",
    heading: "STARBURST LANTERNS",
    image: image2,
    price: "89.99",
  },
  {
    id: "solar-candle-holders",
    heading: "SOLAR CANDLE HOLDERS",
    image: image3,
    price: "79.99",
  },
  {
    id: "solar-candle-hurricanes",
    heading: "SOLAR CANDLE HURRICANES",
    image: image4,
    price: "119.99",
  },
  {
    id: "acacia-wood-candle-holders",
    heading: "ACACIA WOOD CANDLE HOLDERS",
    image: image5,
    price: "69.99",
  },
  {
    id: "eris-marble-candle-holders",
    heading: "ERIS MARBLE CANDLE HOLDERS",
    image: image6,
    price: "69.99",
  },
  {
    id: "psyche-candle-holders",
    heading: "PSYCHE CANDLE HOLDERS",
    image: image7,
    price: "69.99",
  },
];

const SliderS = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/decor/candleDecor/${id}`);
  };

  return (
    <div className="container">
      <style>
        {`
          .gradient-text {
            background: linear-gradient(0deg, #7D3E00 -7.62%, #FFC170 14.51%, #FFEED8 32.4%, #FFC170 84.95%, #7D3E00 106.96%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .slider-arrow {
            position: absolute;
            top: 50%;
            z-index: 10;
            color: white;
            padding: 10px;
            cursor: pointer;
            transform: translateY(-50%);
          }
          .slider-arrow-left {
            left: 5px;
          }
          .slider-arrow-right {
            right: 5px;
          }
          .swiper-container {
            position: relative;
            padding-bottom: 40px; /* Add space for pagination */
          }
          .swiper-pagination {
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            width: 100% !important;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background-color: #7D3E00 !important;;
            opacity: 0.6;
            margin: 0 5px;
            cursor: pointer;
          }
          .swiper-pagination-bullet-active {
          background-color: #7D3E00 !important;;
            opacity: 1;
            transform: scale(1.2);
            
          }
        `}
      </style>

      <h1 className="text-4xl font-montserrat font-medium mt-10 text-center mb-4 ">
        HOME DECOR
      </h1>

      <div className="swiper-container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              onClick={() => handleClick(product.id)}
              className="cursor-pointer"
            >
              <img src={product.image} alt={product.heading} />
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev slider-arrow slider-arrow-left">
            <IoIosArrowDropleftCircle size={20} />
          </div>
          <div className="swiper-button-next slider-arrow slider-arrow-right">
            <IoIosArrowDroprightCircle size={20} />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default SliderS;