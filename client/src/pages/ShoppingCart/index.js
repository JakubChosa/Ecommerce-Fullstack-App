import Wrapper from "./ShoppingCartStyled";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import CartContent from "../../components/Cart/CartContent";

const ShoppingCart = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <Wrapper className="full-page">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn">
            Go Shopping
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper className="full-page">
      <CartContent />
    </Wrapper>
  );
};
export default ShoppingCart;
