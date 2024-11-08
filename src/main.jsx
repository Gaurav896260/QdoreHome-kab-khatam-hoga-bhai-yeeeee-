import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "../src/redux/store.js";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Create a root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside the Provider and React.StrictMode
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <App />
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
