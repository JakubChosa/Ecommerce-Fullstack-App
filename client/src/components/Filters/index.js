import React, { useState } from "react";
import { useProductsContext } from "../../context/productsContext";
import { formatPrice, getUniqueValues } from "../../utils/helpers";
import { FaCheck } from "react-icons/fa";
import Wrapper from "./FiltersStyled";
import ColorsFilter from "./ColorsFilter";
import CategoriesFilter from "./CategoriesFilter";

const Filters = () => {
  const {
    handleChange,
    filters: {
      search,
      category,
      categories,
      company,
      companies,
      colors,
      colorsOptions,
      price,
      min_price,
      max_price,
      freeShipping,
    },
    clearFilters,
    getProducts,
    products_loading,
  } = useProductsContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    getProducts();
  };

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              type="text"
              name="search"
              value={search}
              onChange={handleChange}
              placeholder="search"
              className="search-input"
              disabled={products_loading}
            />
          </div>
        </form>
        <form onSubmit={handleSubmit}>
          <CategoriesFilter
            handleChange={handleChange}
            categories={categories}
            category={category}
          />
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              onChange={handleChange}
              className="company"
            >
              {companies.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <ColorsFilter
            handleChange={handleChange}
            colorsOptions={colorsOptions}
            colors={colors}
          />
          <div className="form-control">
            <h5>price</h5>
            <p className="price">
              {formatPrice(price)}
              <button name="price" type="submit" className="btn">
                Save
              </button>
            </p>
            <input
              type="range"
              name="price"
              onChange={handleChange}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          <div className="form-control shipping">
            <label htmlFor="freeShipping">free Shipping </label>
            <input
              type="checkbox"
              name="freeShipping"
              onChange={handleChange}
              checked={freeShipping}
            />
          </div>
          <button
            type="submit"
            className="btn clear-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Filters;
