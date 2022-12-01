import Wrapper from "./NavbarStyled";
import logo from "../../assets/images/logo.png";
import OrderContainer from "../OrderContainer";
import { useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { useCartContext } from "../../context/cartContext";

const Navbar = () => {
  const { totalItems } = useCartContext();
  const [showLogout, setShowLogout] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const { user, logoutUser } = useUserContext();

  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
    setShowOrders(false);
  };

  const logout = () => {
    if (user) {
      logoutUser();
    }
    toggleLogout();
  };

  const displayOrders = () => {
    toggleLogout();
    setShowOrders(true);
  };

  return (
    <Wrapper>
      <div className="nav container">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
          <span className="logo-text">urniture</span>
        </Link>
        <nav>
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/products" className="link">
            Products
          </Link>
          <Link to="/cart" className="link">
            <span className="cart-container">
              <IoCart className="icon" />
              <span className="cart-value">
                {totalItems >= 99 ? 99 : totalItems}
              </span>
            </span>
          </Link>
        </nav>
        <div className="btn-container">
          <button type="button" className="btn" onClick={toggleLogout}>
            <FaUserCircle />
            <span className="show-text">{user ? user.name : "User"}</span>
            <FaCaretDown />
          </button>
          <div className={showLogout ? `dropdown show-dropdown` : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logout}>
              {user ? (
                "Logout"
              ) : (
                <Link to="/register" className="login-btn">
                  Login
                </Link>
              )}
            </button>
            {user && (
              <div>
                <hr />
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={displayOrders}
                >
                  My Orders
                </button>
              </div>
            )}
          </div>
        </div>
        {user && (
          <div className={`container ${showOrders ? "show-orders" : "orders"}`}>
            <OrderContainer setShowOrders={setShowOrders} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};
export default Navbar;
