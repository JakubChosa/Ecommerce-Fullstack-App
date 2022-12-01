import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { useCartContext } from "../context/cartContext";

const SingleOrder = ({ order }) => {
  const { status, total, orderItems, _id: orderId } = order;
  const { cancelOrder } = useCartContext();

  const cancelOrderRequest = () => {
    cancelOrder(orderId);
  };
  return (
    <Wrapper>
      <p className="title">Order: {orderId}</p>
      <div className="products">
        <p className="subtitle">Products</p>
        {orderItems.map((item) => {
          const { price, color, amount, name } = item;
          return (
            <div className="grid" key={item._id}>
              <div>
                <p>name: {name}</p>
                <p>price: {formatPrice(price)}</p>
              </div>
              <div>
                <p>amount: {amount}</p>
                <p className="color">
                  color: <span style={{ background: color }}></span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid">
        <p className="info">total: {formatPrice(total)}</p>
        <p className="info">status: {status}</p>
      </div>
      {status === "pending" && (
        <button
          className="btn cancel-btn"
          type="button"
          onClick={cancelOrderRequest}
        >
          Cancel Order
        </button>
      )}
    </Wrapper>
  );
};
export default SingleOrder;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  align-items: center;
  .title {
    text-align: center;
    border-bottom: 1px solid var(--grey-200);
  }
  .subtitle {
    text-align: center;
    color: black;
    font-weight: 500;
    font-size: 1rem;
  }
  .products {
    display: grid;
    align-items: center;
    text-align: left;
    row-gap: 0.5rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    text-align: left;
  }
  p {
    color: var(--grey-800);
    font-weight: 400;
    margin: 0;
    line-height: 1.5;
    font-size: 0.9rem;
  }
  .info {
    color: black;
    font-weight: 500;
    font-size: 1rem;
  }
  .color {
    color: var(--grey-800);
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: 50%;
    }
  }
  .cancel-btn {
    font-size: 1rem;
    font-weight: 400;
    width: 180px;
    margin-inline: auto;
  }
`;
