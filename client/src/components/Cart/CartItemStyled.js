import styled from "styled-components";

const Wrapper = styled.article`
  .small-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }
  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px minmax(115px, 140px);
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 10px;
    object-fit: cover;
  }
  .name {
    color: var(--black);
  }
  .color {
    color: var(--grey-800);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: 50%;
    }
  }
  .price-small {
    color: var(--grey-800);
    font-weight: 600;
  }
  .remove-btn {
    color: var(--white);
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--black);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .hidden {
    display: none;
  }
  @media (min-width: 450px) {
    .hidden {
      display: inline-block;
    }
    .small-screen {
      display: none;
    }
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--grey-800);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--grey-800);
      font-weight: 600;
    }
    .name {
      font-size: 0.9rem;
    }
    .color {
      font-size: 0.9rem;
      span {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
  }
`;
export default Wrapper;
