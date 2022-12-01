import styled from "styled-components";

const Wrapper = styled.main`
  padding-inline: 1em;
  .product-center {
    display: grid;
    gap: 5rem;
    margin-top: 2rem;
  }
  .average-reviews {
    display: flex;
    align-items: center;
    padding-block: 0.5rem;
  }
  .reviews {
    margin: 0;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    margin-block: 0.75rem;
    display: grid;
    grid-template-columns: 100px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 900px) {
    padding-inline: 2em;
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default Wrapper;
