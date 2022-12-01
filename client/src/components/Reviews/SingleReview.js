import styled from "styled-components";
import { Stars } from "../index";
import { FaTrash } from "react-icons/fa";
import { useUserContext } from "../../context/userContext";
import { useProductsContext } from "../../context/productsContext";

const SingleReview = ({ review }) => {
  const { user } = useUserContext();
  const { deleteReview } = useProductsContext();
  const { _id, userName, createdAt, comment, title, rating: stars } = review;

  return (
    <Wrapper>
      <div className="user-info">
        <Stars stars={stars} className="rating" />
        <p>{userName}</p>
        <p className="time">{createdAt.split("T")[0]}</p>
      </div>
      <div className="review">
        <h5>{title}</h5>
        <p>{comment}</p>
      </div>
      {user?.name === userName && (
        <button
          type="button"
          className="remove-btn hidden"
          onClick={() => deleteReview(_id)}
        >
          <FaTrash />
        </button>
      )}
    </Wrapper>
  );
};
export default SingleReview;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  grid-template-columns: 1fr;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: var(--shadow-2);
  position: relative;
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 0.5rem;
    p {
      margin: 0;
      text-transform: capitalize;
    }
    .time {
      font-size: 0.8rem;
      margin-top: 0;
    }
  }
  .review {
    h5 {
      margin-bottom: 0.3rem;
    }
    p {
      margin: 0;
    }
  }
  .remove-btn {
    color: var(--white);
    border: transparent;
    background: var(--black);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    translate: 0 -50%;
  }
  @media (min-width: 600px) {
    grid-template-columns: 200px 1fr;
    column-gap: 3rem;
    .user-info {
      flex-direction: column;
      p {
        margin-top: 1rem;
      }
    }
  }
`;
