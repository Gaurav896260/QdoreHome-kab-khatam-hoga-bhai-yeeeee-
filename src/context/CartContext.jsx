import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingProductIndex > -1) {
        // Update quantity if product already exists
        const updatedItems = [...prevItems];
        updatedItems[existingProductIndex].quantity += product.quantity;
        return updatedItems;
      } else {
        // Add new product
        return [...prevItems, product];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
