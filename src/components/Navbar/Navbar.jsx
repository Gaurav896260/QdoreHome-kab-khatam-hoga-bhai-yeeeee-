import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logoImp.png";
import { IoMdSearch } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaLinkedin, FaAmazon, FaPhoneAlt, FaMapMarkerAlt, FaEnvelopeSquare } from 'react-icons/fa';
import {
  FaCartPlus,
  FaUser,
  FaBars,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import DarkMode from "./DarkMode";
import { useSelector } from "react-redux";
import data from "./data.js";

const Menu = [
  { id: 0, name: "Our Collection", link: "/ourCollection" },
  {
    id: 1,
    name: "Furniture",
    link: "/furniture",
    subMenu: [
      { name: "All", link: "/furniture" },
      { name: "Side Tables", link: "/furniture/side-table" },
      { name: "Coffee Tables", link: "/furniture/coffee-table" },
    ],
  },
  {
    id: 2,
    name: "Home Decor",
    link: "/decor",
    subMenu: [
      { name: "All", link: "/decor" },
      { name: "Candle Holders", link: "/decor/candledecor" },
      { name: "Object Decor", link: "/decor/objectDecor" },
    ],
  },
  { id: 3, name: "Serveware", link: "/servewares" },
  { id: 4, name: "Planters & Vases", link: "/plantersandvases" },
  { id: 5, name: "Our Story", link: "/ourStory" },
  { id: 6, name: "Contact Us", link: "/contactUs" },
  { id: 7, name: "B2B", link: "/b2b" },
];

const changingTexts = [
  "Free Shipping",
  "Sign Up for Exclusive Offers",
  "COD Available",
  "Hassle Free Return & Exchange",
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // New state for mobile submenu
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const isLoggedIn = !!userInfo;

  const [query, setQuery] = useState("");

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === changingTexts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleNavigation = (link) => {
    navigate(link);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input) {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredItems(filteredData);
    } else {
      setFilteredItems([]);
    }
  };

  const handleItemClick = (id) => {
    const product = data.find((item) => item.id === id);

    if (product) {
      if (product.id.includes("side")) {
        navigate(`/furniture/side-table/${product.id}`);
      } else if (
        product.id.includes("candle") ||
        product.id.includes("lanterns")
      ) {
        navigate(`/decor/candleDecor/${product.id}`);
      } else if (product.id.includes("mercury")) {
        navigate(`/mercuryCollection/${product.id}`);
      } else if (product.id.includes("globe")) {
        navigate(`/decor/objectDecor/${product.id}`);
      } else if (product.id.includes("serveware")) {
        navigate(`/servewares/${product.id}`);
      } else {
        navigate(`/woodenCollection/${product.id}`);
      }
    }
  };

  const handleSearchClick = (product) => {
    if (Servewareproducts.some((item) => item.id === product.id)) {
      navigate(`/servewares/${product.id}`);
    } else if (Woodenproducts.some((item) => item.id === product.id)) {
      navigate(`/woodenCollection/${product.id}`);
    }
    setSearchOpen(false);
    setSearchTerm("");
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  // New function to toggle mobile submenu
  const handleSubMenuToggle = (id) => {
    if (activeSubMenu === id) {
      setActiveSubMenu(null); // Close the submenu if it's already open
    } else {
      setActiveSubMenu(id); // Open the submenu
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchOpen &&
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      setFilteredItems([]);
    }
  }, [searchOpen]);

  return (
    <div className="sticky top-0 z-40 bg-black dark:bg-black dark:text-white">
      <div className="bg-black py-2 text-center text-white text-2xl font-roboto font-normal">
        <p>{changingTexts[currentTextIndex]}</p>
      </div>

      <div className="shadow-md duration-200">
        <div
          className="bg-black py-2 flex items-center justify-between"
          style={{ height: "50px" }}
        >
          <div className="container flex justify-between items-center relative mx-auto px-4">
            <div className="flex items-center gap-4 " ref={searchContainerRef}>
              <div className="relative group flex items-center">
                <IoMdSearch
                  className="text-white z-50 text-4xl cursor-pointer hover:text-golden-yellow transition-all duration-200"
                  onClick={() => {
                    setSearchOpen(!searchOpen);
                    if (!searchOpen) {
                      setTimeout(() => {
                        document.getElementById("search-input").focus();
                      }, 300);
                    }
                  }}
                />
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ml-2 ${searchOpen ? "w-40 sm:w-60 opacity-100" : "w-0 opacity-0"
                    }`}
                >
                  <input
                    id="search-input"
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="px-3 py-2 text-lg font-roboto rounded-full border border-gray-300 focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-gray-800 w-full transition-all duration-300"
                  />
                </div>
                {filteredItems.length > 0 && (
                  <div className="absolute top-12 left-0 bg-white dark:bg-gray-800 w-full shadow-lg rounded-lg z-50">
                    <ul>
                      {filteredItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => handleItemClick(item.id)}
                          className="px-4 py-2 text-sm border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center absolute inset-x-0 mx-auto">
              <a
                onClick={() => handleNavigation("/")}
                className="font-bold text-2xl sm:text-3xl flex items-center cursor-pointer"
              >
                <img
                  src={Logo}
                  alt="Logo"
                  className="drop-shadow-lg"
                  style={{ height: "40px", width: "auto" }}
                />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavigation("/cart")}
                className="bg-gradient-to-r from-golden-yellow to-golden-orange transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                <FaCartPlus className="text-2xl text-white drop-shadow-sm cursor-pointer" />
              </button>

              <button
                onClick={handleProfileClick}
                className="text-white transition-all duration-200 py-1 px-4 rounded-full flex items-center gap-3 group"
              >
                {isLoggedIn ? (
                  <FaUserCircle className="text-2xl drop-shadow-sm cursor-pointer" />
                ) : (
                  <FaUser className="text-2xl drop-shadow-sm cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white flex justify-center p-2 sm:p-0">
          <ul className="sm:flex hidden items-center gap-4">
            {Menu.map((data) => (
              <li
                key={data.id}
                className={`relative group ${data.subMenu ? "hover:bg-gray-100" : ""
                  }`}
                onMouseEnter={() => data.subMenu && setActiveDropdown(data.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  onClick={() => !data.subMenu && handleNavigation(data.link)}
                  className="inline-block px-4 text-black text-2xl font-roboto relative cursor-pointer transform transition-transform hover:scale-105 flex items-center"
                >
                  {data.name}
                </a>
                {data.subMenu && activeDropdown === data.id && (
                  <ul className="absolute bg-white shadow-lg rounded-lg top-full w-40 left-0">
                    {data.subMenu.map((subItem, index) => (
                      <li key={index} className="hover:bg-gray-200">
                        <a
                          onClick={() => handleNavigation(subItem.link)}
                          className="block px-4 py-2 text-black hover:text-golden-yellow duration-200 text-base font-roboto"
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu (Shifted Bar Button to Left) */}
          <div className="sm:hidden flex items-center justify-between w-full">
            <FaBars
              className="text-black text-3xl z-50 cursor-pointer ml-4"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="fixed inset-0 left-0 top-0 bg-black bg-opacity-30 z-50">
                <div className="fixed inset-y-0 left-0 bg-white p-4 w-4/5 overflow-y-auto">
                  <div className="flex justify-end">
                    <button
                      className="text-black text-3xl"
                      onClick={() => setMenuOpen(false)}
                    >
                      &times;
                    </button>
                  </div>
                  
                  <div className="flex  mt-6 ">
                    <a
                      onClick={() => handleNavigation("/")}
                      className="font-bold text-2xl sm:text-3xl flex items-center cursor-pointer"
                    >
                      <img
                        src={Logo} // Replace this with the actual path to your logo
                        alt="Logo"
                        className="w-40 h-auto" // Adjust the size as needed
                      />
                    </a>
                  </div>

                  


                  <ul className="flex flex-col items-start gap-4 mt-10 space-y-2">
                    {Menu.map((data) => (
                      <li key={data.id} className="w-full">
                        <div
                          className="text-black text-2xl font-serif flex items-center justify-between w-full cursor-pointer border-b border-gray-300 py-2"
                          onClick={() => {
                            if (data.subMenu) {
                              handleSubMenuToggle(data.id);
                            } else {
                              handleNavigation(data.link);
                            }
                          }}
                        >
                          <span className="font-semibold">{data.name}</span>
                          {data.subMenu && (
                            <FaChevronDown
                              className={`ml-2 z-50 cursor-pointer transition-transform ${activeSubMenu === data.id ? "rotate-180" : ""
                                }`}
                            />
                          )}
                        </div>

                        {data.subMenu && activeSubMenu === data.id && (
                          <ul className="pl-4 mt-2 w-full">
                            {data.subMenu.map((subItem, index) => (
                              <li key={index} className="w-full">
                                <a
                                  onClick={() => handleNavigation(subItem.link)}
                                  className="block px-4 py-2 text-xl  text-black font-serif border-b border-gray-200 hover:bg-gray-100"
                                >
                                  {subItem.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <p><br /><br /></p>
                  </div>
                  <div className="flex gap-8 mb-10 mt-10">
                    {/* Social Media Icons */}
                    <div className="relative group">
                      <a
                        href="https://www.facebook.com/profile.php?id=61560626668033&mibextid=LQQJ4d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookF className="hover:text-gray-400 cursor-pointer text-4xl" />
                      </a>
                      <span className="absolute left-0 bottom-8 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Facebook
                      </span>
                    </div>

                    <div className="relative group">
                      <a
                        href="https://www.instagram.com/qdorehome?igsh=M21uZ3hhb251a2c2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="hover:text-gray-400 cursor-pointer text-4xl" />
                      </a>
                      <span className="absolute left-0 bottom-8 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Instagram
                      </span>
                    </div>

                    <div className="relative group">
                      <a
                        href="https://www.linkedin.com/company/qdore-home/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="hover:text-gray-400 cursor-pointer text-4xl" />
                      </a>
                      <span className="absolute left-0 bottom-8 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        LinkedIn
                      </span>
                    </div>

                    <div className="relative group">
                      <a
                        href="https://www.amazon.in/dp/B0DDC5HDTD"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaAmazon className="hover:text-gray-400 cursor-pointer text-4xl" />
                      </a>
                      <span className="absolute left-0 bottom-8 text-xs bg-gray-700 text-white rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Amazon
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
