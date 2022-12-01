import React from "react";
import { useProductsContext } from "../context/productsContext";
import styled from "styled-components";
const Sort = () => {
  const { totalProducts, sort, updateSort } = useProductsContext();
  return (
    <Wrapper>
      <p>
        <span className="bolder">{totalProducts}</span> Products Found
      </p>
      <hr className="line" />
      <form>
        <label htmlFor="sort">sort by</label>
        <select
          name="sort"
          id="sort"
          className="sort-input"
          value={sort}
          onChange={updateSort}
        >
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 450px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    label {
      display: inline-block;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p,
  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    text-transform: capitalize;
    margin: 0;
    gap: 0.3rem;
  }
  .sort-input {
    background-color: var(--gray-50);
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
  .line {
    width: 100%;
    display: none;
  }
  .bolder {
    font-weight: 600;
  }
  @media (min-width: 660px) {
    grid-template-columns: auto 1fr auto;
    .line {
      width: 100%;
      display: inline-block;
    }
  }
`;

export default Sort;
