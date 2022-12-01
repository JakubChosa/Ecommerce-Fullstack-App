import styled from "styled-components";
import { useState } from "react";
import { Stars } from "../index";
import { useUserContext } from "../../context/userContext";
import { useProductsContext } from "../../context/productsContext";
import { Link } from "react-router-dom";

const PostReview = ({ productId }) => {
  const { user, showAlert } = useUserContext();
  const { createReview, deleteReview } = useProductsContext();
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: "",
    comment: "",
    product: productId,
  });
  const [maxCommentLength, setMaxCommentLength] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.currentTarget.name === "rating") {
      name = e.currentTarget.name;
      value = e.currentTarget.dataset.rating;
    }
    if (name === "comment") {
      value.length >= 200
        ? setMaxCommentLength(true)
        : setMaxCommentLength(false);
    }
    setReviewData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { rating, title, product, comment } = reviewData;
    if (!rating || !title || !comment || !product) {
      showAlert({ message: "please provide all values" });
      return;
    }
    createReview(reviewData);
    setReviewData({
      rating: 5,
      title: "",
      comment: "",
      product: product,
    });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-head">
          <div className="form-row">
            <p className="rating-title">rating</p>
            <Stars handleChange={handleChange} />
          </div>
          <div className="form-row">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              value={reviewData.title}
              name="title"
              onChange={handleChange}
              className="form-input review-title"
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="comment" className="form-label">
            comment
          </label>
          <textarea
            name="comment"
            value={reviewData.comment}
            onChange={handleChange}
            className="form-textarea comment"
          />
        </div>
        {user ? (
          <div className="submit">
            <div>{reviewData.comment.length}/200 characters</div>
            <button type="submit" disabled={maxCommentLength} className="btn">
              Post Review
            </button>
          </div>
        ) : (
          <div className="submit">
            <div>Login to create review</div>
            <Link to="../../register" className="btn">
              Login
            </Link>
          </div>
        )}
      </form>
    </Wrapper>
  );
};
export default PostReview;

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%;
  form {
    width: 100%;
    padding: 1rem;
  }
  .form-head {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
  }
  label {
    margin-block: 0;
  }
  input {
    width: 100%;
  }
  .review-title {
    width: 100%;
    text-align: left;
  }
  .rating-title {
    display: block;
    font-size: var(--smallText);
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    margin: 0;
  }
  .comment {
    width: 100%;
    height: 8ch;
  }
  .submit {
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: 600px) {
    form {
      padding-inline: 2rem;
      width: 100%;
    }
    .form-head {
      grid-auto-flow: column;
      grid-template-columns: 1fr 200px;
      .form-row:first-child {
        grid-column-start: 2;
        justify-self: center;
      }
    }
  }
`;
