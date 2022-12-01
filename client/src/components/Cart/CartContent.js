import React from "react";
import styled from "styled-components";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const { cart, clearCart } = useCartContext();
  return (
    <Wrapper className="section section-center container">
      <CartColumns />
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <hr />
      <div className="link-container">
        <Link to="/products" className="btn">
          continue Shopping
        </Link>
        <button type="button" className="clear-btn btn" onClick={clearCart}>
          Clear Shopping Cart
        </button>
      </div>
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding-inline: 2rem;
  .link-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 1rem;
  }
  @media (min-width: 440px) {
    .link-container {
      flex-direction: row;
    }
  }
`;
export default CartContent;
