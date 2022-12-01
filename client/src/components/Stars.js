import React, { useState } from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars, handleChange }) => {
  const [starsRating, setStarsRating] = useState(5);
  const changeStarRating = (number, e) => {
    setStarsRating(number);
    handleChange(e);
  };

  const starsArray = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return stars || stars === 0 ? (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill className="star" />
        ) : stars >= number ? (
          <BsStarHalf className="star" />
        ) : (
          <BsStar className="star" />
        )}
      </span>
    ) : (
      <button
        key={index}
        type="button"
        name="rating"
        onClick={(e) => changeStarRating(index + 1, e)}
        data-rating={index + 1}
      >
        {starsRating >= index + 1 ? (
          <BsStarFill className="star" />
        ) : starsRating >= number ? (
          <BsStarHalf className="star" />
        ) : (
          <BsStar className="star" />
        )}
      </button>
    );
  });

  return (
    <Wrapper>
      <div className="stars">{starsArray}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  span {
    color: #ffb900;
    margin-right: 0.25rem;
  }
  button {
    color: #ffb900;
    font-size: 1.2rem;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
  p {
    margin: 0;
    margin-left: 0.5rem;
  }
  .stars {
    display: flex;
    align-items: center;
  }
  .star {
    display: grid;
    place-items: center;
  }
`;
export default Stars;
