import React from "react";
import { formatPrice } from "../../utils/helpers";
import AmountButtons from "../AmountButtons";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import Wrapper from "./CartItemStyled";

const CartItem = ({ id, image, name, color, price, amount }) => {
  const { removeItem, toggleAmount } = useCartContext();
  const increase = () => {
    toggleAmount(id, "increase");
  };
  const decrease = () => {
    toggleAmount(id, "decrease");
  };

  return (
    <Wrapper>
      <div className="title">
        <img src={require(`../../assets/images/${image}`)} alt={name} />
        <div>
          <Link to={`../products/${id.split("#")[0]}`} className="name">
            {name}
          </Link>
          <p className="color">
            color: <span style={{ background: color }}></span>
          </p>
          <h5 className="price-small">{formatPrice(price)}</h5>
        </div>
      </div>
      <h5 className="price">{formatPrice(price)}</h5>
      <div className="hidden">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
      </div>
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button
        type="button"
        className="remove-btn hidden"
        onClick={() => removeItem(id)}
      >
        <FaTrash />
      </button>
      <div className="small-screen">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <button
          type="button"
          className="remove-btn"
          onClick={() => removeItem(id)}
        >
          <FaTrash />
        </button>
      </div>
    </Wrapper>
  );
};

export default CartItem;
