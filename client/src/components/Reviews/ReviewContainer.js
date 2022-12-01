import styled from "styled-components";
import SingleReview from "./SingleReview";
import PostReview from "./PostReview";

const ReviewsContainer = ({ reviews, product }) => {
  return (
    <Wrapper className="section section-center">
      <h3 className="title">Reviews</h3>
      <PostReview productId={product} className="form-container" />
      {reviews.map((review) => (
        <SingleReview key={review._id} review={review} />
      ))}
    </Wrapper>
  );
};
export default ReviewsContainer;

const Wrapper = styled.section`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 700px;
`;
