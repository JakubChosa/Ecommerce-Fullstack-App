import React from "react";
import styled from "styled-components";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import { formatPrice } from "../../utils/helpers";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CartTotals = () => {
  const { totalAmount, shippingFee, cart, createOrder } = useCartContext();
  const { user, showAlert } = useUserContext();

  const navigate = useNavigate();

  const createNewOrder = () => {
    if (!user) {
      showAlert({ message: "you have to be logged in to proceed order" });
      navigate("/register");
      return;
    }
    createOrder();
  };

  const freeShippingCheck = cart.every((item) => {
    return item.freeShipping === true;
  });
  return (
    <Wrapper>
      <div className="flex">
        <article>
          <h5>
            subtotal : <span>{formatPrice(totalAmount)}</span>
          </h5>
          <p>
            shipping fee :{" "}
            <span>
              {freeShippingCheck ? formatPrice(0) : formatPrice(shippingFee)}
            </span>
          </p>
          <hr />
          <h4>
            order total : <span>{formatPrice(totalAmount + shippingFee)}</span>
          </h4>
        </article>
        <button
          type="button"
          className="btn order-btn"
          onClick={createNewOrder}
        >
          Order{" "}
          <span>
            <FiArrowRight />
          </span>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  .flex {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  article {
    border: 1px solid var(--grey-800);
    border-radius: 10px;
    padding: 1.5rem 2rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 160px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  .order-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 180px;
    padding-block: 0.5rem;
    margin-top: 1rem;
    margin-inline: auto;
    font-weight: 700;
    color: var(--white);
    background-color: var(--black);
    transition: all 0.3s;
    span {
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      position: relative;
    }
  }
  .order-btn:hover {
    opacity: 0.8;
    box-shadow: var(--shadow-3);
    span {
      left: 10px;
    }
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
    article {
      padding: 1.5rem 3rem;
    }
  }
`;

export default CartTotals;
