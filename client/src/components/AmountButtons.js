import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({ amount, decrease, increase }) => {
  return (
    <Wrapper>
      <button onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className="amount">{amount}</h2>
      <button onClick={increase}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 25px 25px 25px;
  align-items: center;
  gap: 0.3rem;
  h2 {
    margin-bottom: 0;
    font-size: 1.6rem;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
