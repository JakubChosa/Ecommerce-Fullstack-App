import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/productsReducer";
import { useUserContext } from "./userContext";

import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  HANDLE_CHANGE,
  UPDATE_SORT,
  SORT_PRODUCTS,
  CLEAR_FILTERS,
} from "./actions";

const initialState = {
  products_error: false,
  products_loading: false,
  products: [],
  totalProducts: null,
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  filters: {
    search: "",
    category: "all",
    categories: [],
    company: "all",
    companies: [],
    colors: "all",
    colorsOptions: [],
    price: 0,
    max_price: 0,
    min_price: 0,
    freeShipping: false,
  },
  sort: "name-a",
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, showAlert, logoutUser } = useUserContext();

  const getProducts = async () => {
    const { search, category, company, colors, price, freeShipping } =
      state.filters;

    let url = `/api/v1/products?category=${category}&company=${company}&colors=${colors}&price=${price}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    if (freeShipping) {
      url = url + `&freeShipping=${freeShipping}`;
    }
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await axios(url);
      const { products, totalProducts } = data;
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: { products, totalProducts },
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  const { category, company, colors, freeShipping } = state.filters;
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [category, category, company, colors, freeShipping]);

  const getSingleProduct = async (productId) => {
    dispatch({ type: GET_PRODUCT_BEGIN });
    try {
      const { data } = await axios(`/api/v1/products/${productId}`);
      const { product } = data;
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: product,
      });
    } catch (error) {
      dispatch({ type: GET_PRODUCT_ERROR });
    }
  };
  const updateSort = (e) => {
    const { value } = e.target;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sort]);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "colors") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "freeShipping") {
      value = e.target.checked;
    }
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const authFetch = axios.create({
    baseURL: "/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const createReview = async (review) => {
    try {
      const { data } = await authFetch.post("/reviews", review);
      showAlert({
        message: data.msg,
        type: "success",
      });
    } catch (error) {
      showAlert({ message: error.response.data.msg });
      if (error.response.status === 401) {
        logoutUser();
        return;
      }
    }
  };

  const deleteReview = async (id) => {
    try {
      const { data } = await authFetch.delete(`/reviews/${id}`);
      showAlert({ message: data.msg, type: "success" });
    } catch (error) {
      showAlert({ message: error.response.data.msg });
      if (error.response.status === 401) {
        logoutUser();
        return;
      }
    }
  };
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getSingleProduct,
        getProducts,
        handleChange,
        clearFilters,
        updateSort,
        createReview,
        deleteReview,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
