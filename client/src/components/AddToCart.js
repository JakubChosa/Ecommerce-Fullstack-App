import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cartContext";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { id, inventory, colors } = product;
  const { addToCart } = useCartContext();
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((prevAmount) =>
      prevAmount >= inventory ? inventory : prevAmount + 1
    );
  };
  const decrease = () => {
    setAmount((prevAmount) => (prevAmount <= 1 ? 1 : prevAmount - 1));
  };

  return (
    <Wrapper>
      <div className="colors">
        <span> colors : </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`${
                  mainColor === color ? "color-btn active" : "color-btn"
                }`}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart({ id, mainColor, amount, product })}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: grid;
    place-items: center;
    svg {
      font-size: 0.75rem;
      color: var(--white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 1rem;
    width: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export default AddToCart;
