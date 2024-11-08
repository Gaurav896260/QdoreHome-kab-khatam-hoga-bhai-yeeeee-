import React, { useState, useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { Woodenproducts, Servewareproducts } from "./searchData";

const NavbarSearch = ({ handleSearchClick }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const allProducts = [...Woodenproducts, ...Servewareproducts];
    setFilteredProducts(
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <IoMdSearch
        className="text-white text-2xl cursor-pointer hover:text-golden-yellow transition-all duration-200"
        onClick={toggleSearch}
      />
      {searchOpen && (
        <div className="absolute top-8 left-0 z-50">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800"
          />
          {filteredProducts.length > 0 && searchTerm && (
            <ul className="absolute bg-white shadow-lg rounded-lg mt-1 w-48 z-50 max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSearchClick(product)}
                >
                  <span className="block px-4 py-2 text-black">
                    {product.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSearch;
