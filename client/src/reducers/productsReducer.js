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
} from "../context/actions";

import { getUniqueValues } from "../utils/helpers";

const products_reducer = (state, action) => {
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    const { products } = action.payload;
    const featured_products = products.filter(
      (product) => product.featured === true
    );
    const priceArray = products.map((p) => p.price);
    const minPrice = Math.min(...priceArray);
    const maxPrice = Math.max(...priceArray);
    const categoriesArray = getUniqueValues(products, "category");
    const companiesArray = getUniqueValues(products, "company");
    const colorsOptionsArray = getUniqueValues(products, "colors");
    const { min_price, max_price, categories, companies, colorsOptions } =
      state.filters;

    // setting filters valueOptions at first fetch
    return {
      ...state,
      products_loading: false,
      products: products,
      totalProducts: action.payload.totalProducts,
      featured_products:
        state.featured_products.length > 0
          ? state.featured_products
          : featured_products,
      filters: {
        ...state.filters,
        max_price: max_price > 0 ? max_price : maxPrice,
        min_price: min_price > 0 ? min_price : minPrice,
        price: state.filters.price > 0 ? state.filters.price : maxPrice,
        categories: categories.length > 0 ? categories : categoriesArray,
        companies: companies.length > 0 ? companies : companiesArray,
        colorsOptions:
          colorsOptions.length > 0 ? colorsOptions : colorsOptionsArray,
      },
    };
  }

  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_error: true, products_loading: false };
  }
  if (action.type === GET_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GET_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === GET_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, products } = state;
    let tempProducts = [...products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      sort: "name-a",
      filters: {
        ...state.filters,
        search: "",
        category: "all",
        company: "all",
        colors: "all",
        price: state.filters.max_price,
        freeShipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
