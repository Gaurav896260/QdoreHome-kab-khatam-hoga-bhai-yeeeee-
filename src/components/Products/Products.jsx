import React from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/sidetables/side11.png";
import Img2 from "../../assets/sidetables/side33.png";
import Img3 from "../../assets/CandleHolders/ch22.png"
import Img4 from "../../assets/objectDecor/globe2.png"
import { FaArrowRight } from "react-icons/fa";
import styled from "styled-components";

const Heading = styled.h2`
  text-align: center;
  font-size: 50px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: 27px 0;
  grid-gap: 20px;
  align-items: center;
  margin: 80px 0 20px;
   font-family: "Lora", serif;

  &:after,
  &:before {
    content: " ";
    display: block;
   
    height: 5px;
    
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ProductsData = [
  {
    category: "Furniture",
    products: [
      { id: 1, img: Img1, title: "Side Tables", path: "/furniture/side-table" },
      { id: 2, img: Img2, title: "Coffee Tables", path: "/furniture/coffee-table" },
    ],
  },
  {
    category: "Decor",
    products: [
      { id: 4, img: Img3, title: "Candle Decor", path: "/decor/candleDecor" },
      { id: 5, img: Img4, title: "Object Decor", path: "/decor/objectDecor" },
    ],
  },
  {
    category: "Servewares",
    products: [
      { id: 7, img: Img1, title: "Trays and Bowls", path: "/servewares/trays-bowls" },
      { id: 8, img: Img2, title: "Chopping Boards", path: "/servewares/chopping-boards" },
      { id: 9, img: Img1, title: "Serveware Sets", path: "/servewares/serveware-sets" },
    ],
  },
  {
    category: "Planters&Vases",
    products: [
      { id: 10, img: Img2, title: "Planters&Vases" },
    ],
  },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 className="text-2xl text-gray-800 font-lora">
            Top Selling Products for you
          </h1>
        </div>
        {/* Body section */}
        <div>
          {ProductsData.map((categoryData) => (
            <div key={categoryData.category} className="mb-12">
              <Heading className="dark: text - white">
                {categoryData.category}
              </Heading>
              <div className="category-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-5">
                {categoryData.products.map((product, index) => (
                  <div
                    key={product.id}
                    className="space-y-3 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onClick={() => navigate(product.path)}
                  >
                    <img
                      src={product.img}
                      alt={product.title}
                      className="h-[220px] w-[150px] object-cover rounded-md cursor-pointer"
                    />
                    <div>
                      <h3 className="font-semibold text-center">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => navigate(`/${categoryData.category.toLowerCase().replace("&", "and")}`)}
                  className="flex items-center text-primary hover:text-golden-yellow transition-colors duration-200"
                >
                  See More <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 480px) {
          .category-products {
            display: flex;
            overflow-x: auto;
            -ms-overflow-style: none;  /* Internet Explorer 10+ */
            scrollbar-width: none;  /* Firefox */
          }
          .category-products::-webkit-scrollbar {
            display: none;  /* Safari and Chrome */
          }
          .category-products > div {
            min-width: 40%;
            flex: 0 0 auto;
            margin-right: 1rem;  /* Adding gap between the images */
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
