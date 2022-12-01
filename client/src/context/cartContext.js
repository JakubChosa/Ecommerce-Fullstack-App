import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cartReducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  GET_ORDERS_BEGIN,
  GET_ORDERS_ERROR,
  GET_ORDERS_SUCCESS,
} from "./actions";
import axios from "axios";
import { useUserContext } from "./userContext";

const cartItems = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  cart: cartItems ? cartItems : [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 899,
  orders: [],
  order_error: false,
  order_loading: false,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, showAlert, logoutUser } = useUserContext();

  const addToCart = ({ id, mainColor, amount, product }) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, mainColor, amount, product },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const authFetch = axios.create({
    baseURL: "/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const createOrder = async () => {
    const { cart, shippingFee } = state;
    const items = cart.map((item) => {
      const product = item.id.split("#")[0];
      return {
        amount: item.amount,
        color: item.color,
        product,
        name: item.name,
        price: item.price,
        image: item.image,
      };
    });
    try {
      const { data } = await authFetch.post("/orders", {
        items,
        shippingFee,
      });
      showAlert({
        message: data.msg,
        type: "success",
      });
      dispatch({ type: CLEAR_CART });
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
        return;
      }
      showAlert({ message: error.response.data.msg });
    }
    getAllOrders();
  };
  const getAllOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN });
    try {
      const { data } = await authFetch("/orders");
      const { orders } = data;
      dispatch({ type: GET_ORDERS_SUCCESS, payload: { orders } });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR });
      if (error.response.status === 401) {
        logoutUser();
        return;
      }
      showAlert({ message: error.response.data.msg });
    }
  };
  const cancelOrder = async (id) => {
    try {
      const { data } = await authFetch.patch(`/orders/${id}`, {
        status: "canceled",
      });
      showAlert({ message: data.msg, type: "success" });
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
        return;
      }
      showAlert({ message: error.response.data.msg });
    }
    getAllOrders();
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
        createOrder,
        getAllOrders,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
