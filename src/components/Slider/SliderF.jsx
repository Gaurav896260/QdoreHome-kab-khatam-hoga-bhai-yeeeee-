import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider.css';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

import slide_image_1 from '../../assets/sidetables/side1.jpg';
import slide_image_2 from '../../assets/sidetables/side2.jpg';
import slide_image_3 from '../../assets/sidetables/side3.jpg';
import slide_image_4 from '../../assets/sidetables/side4.jpg';
import slide_image_5 from '../../assets/sidetables/side5.jpg';
import slide_image_6 from '../../assets/sidetables/side6.jpg';

const products = [
  {
    id: 'virgo-side-table',
    heading: 'VIRGO SIDE TABLE',
    image: slide_image_2,
    price: '99.99',
  },
  {
    id: 'orbit-side-table',
    heading: 'ORBIT SIDE TABLE',
    image: slide_image_5,
    price: '89.99',
  },
  {
    id: 'pluto-side-table',
    heading: 'PLUTO SIDE TABLE',
    image: slide_image_1,
    price: '79.99',
  },
  {
    id: 'vega-side-table',
    heading: 'VEGA SIDE TABLE',
    image: slide_image_3,
    price: '119.99',
  },
  {
    id: 'acacia-wood-side-table',
    heading: 'ACACIA WOOD SIDE TABLE',
    image: slide_image_4,
    price: '69.99',
  },
  {
    id: 'the-cosmic-mirror-side-table',
    heading: 'THE COSMIC MIRROR SIDE TABLE',
    image: slide_image_6,
    price: '69.99',
  },
];

const SliderF = () => {
  const navigate = useNavigate();

  // Navigate to product detail page on image click
  const handleClick = (id) => {
    navigate(`/furniture/side-table/${id}`);
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
          .custom-pagination {
            display: flex;
            justify-content: center;
            margin-top: 10px;
          }
          .custom-pagination .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background-color: #7D3E00;
            opacity: 0.6;
            border-radius: 50%;
            margin: 0 5px;
            cursor: pointer;
            transition: transform 0.3s;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            opacity: 1;
            transform: scale(1.2);
            
          }
        `}
      </style>

      <h1 className="text-4xl font-montserrat font-medium mt-10 text-center mb-4 ">FURNITURE</h1>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} onClick={() => handleClick(product.id)} className="cursor-pointer">
            <img src={product.image} alt={product.heading} />
          </SwiperSlide>
        ))}

        {/* Custom left and right arrows */}
        <div className="swiper-button-prev slider-arrow slider-arrow-left">
          <IoIosArrowDropleftCircle size={20} />
        </div>
        <div className="swiper-button-next slider-arrow slider-arrow-right">
          <IoIosArrowDroprightCircle size={20} />
        </div>
      </Swiper>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination"></div>
    </div>
  );
};

export default SliderF;
