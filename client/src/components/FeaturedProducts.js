import React, { useEffect } from "react";
import { useProductsContext } from "../context/productsContext";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products: featured,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <div className="title">
        <h2>popular products</h2>
      </div>
      <div className="featured">
        {featured.slice(0, 3).map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--grey-100);
  border-radius: 10px;
  margin: 4rem auto;
  margin-bottom: 0;
  padding: 4rem 1rem;
  h2 {
    margin-bottom: 1em;
  }
  .featured {
    margin: 0 auto;
    display: grid;
    justify-content: center;
    gap: 2.5rem;

    img {
      height: 250px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 900px) {
    .featured {
      grid-template-columns: repeat(3, minmax(150px, 320px));
      img {
        height: 200px;
      }
    }
  }
`;

export default FeaturedProducts;
