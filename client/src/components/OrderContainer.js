import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useCartContext } from "../context/cartContext";
import { Loading, Error } from "./index";
import SingleOrder from "./SingleOrder";
import { useEffect } from "react";

const OrderContainer = ({ setShowOrders }) => {
  const {
    orders,
    orders_loading: loading,
    orders_error: error,
    getAllOrders,
  } = useCartContext();
  useEffect(() => {
    getAllOrders();
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Wrapper>
      <button className="return-btn" onClick={() => setShowOrders(false)}>
        <AiOutlineClose />
      </button>
      <h4>your orders</h4>
      {orders.length < 1 ? (
        <h5>You don't have any orders yet</h5>
      ) : (
        <div className="grid">
          {orders.map((order, index) => {
            return <SingleOrder key={order._id} order={order} />;
          })}
        </div>
      )}
    </Wrapper>
  );
};
export default OrderContainer;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  .return-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.6rem;
    font-weight: bolder;
    color: var(--black);
    background: transparent;
    border: transparent;
    cursor: pointer;
  }
  .return-btn:hover {
    scale: 1.1;
  }
  .grid {
    width: 100%;
    display: grid;
    align-items: center;
    gap: 1rem;
    text-align: left;
  }
`;
