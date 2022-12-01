import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/productsContext";
import { UserProvider } from "./context/userContext";
import { CartProvider } from "./context/cartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </UserProvider>
);
