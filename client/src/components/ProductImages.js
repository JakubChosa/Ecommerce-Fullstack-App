import React, { useState } from "react";
import styled from "styled-components";

const ProductImages = ({ images = [] }) => {
  const [main, setMain] = useState(images[0]);

  return (
    <Wrapper>
      <img src={main} alt="main" className="main" />
      <div className="gallery">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt="furniture"
              key={index}
              onClick={() => setMain(images[index])}
              className={`${image === main ? "active" : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .main {
    height: 450px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: 10px;
    object-fit: cover;
  }
  .gallery {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    margin-top: 1em;
    img {
      height: 100px;
      cursor: pointer;
      object-fit: fill;
    }
  }
  .active {
    border: 1px solid var(--grey-500);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      column-gap: 0.5rem;
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 900px) {
    .main {
      height: 450px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
