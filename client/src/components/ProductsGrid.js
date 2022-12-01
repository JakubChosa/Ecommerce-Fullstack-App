import React from "react";
import styled from "styled-components";
import { Product, Loading, Error } from "./index";
import { useProductsContext } from "../context/productsContext";

const ProductsGrid = () => {
  const {
    products,
    products_error: error,
    products_loading: loading,
  } = useProductsContext();

  if (loading) {
    return <Loading fullHeight />;
  }
  if (error) {
    return <Error fullHeight />;
  }
  return (
    <Wrapper>
      <div className="products-container">
        {products.map((product, index) => {
          return <Product {...product} key={index} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 900px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1120px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default ProductsGrid;
