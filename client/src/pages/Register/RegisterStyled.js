import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .form {
    max-width: 400px;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    position: relative;
  }
  .return-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.6rem;
    font-weight: bolder;
    color: var(--black);
    background: transparent;
    cursor: pointer;
  }
  .return-btn:hover {
    scale: 1.1;
  }
  .form-container {
    padding: 1em 1.5rem;
    align-self: center;
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--grey-600);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  .image-container {
    display: none;
  }
  img {
    height: 100%;
    width: 100%;
  }
  @media (min-width: 650px) {
    .form {
      max-width: 660px;
      grid-template-columns: 1fr 1fr;
      padding: none;
    }
    .image-container {
      display: block;
      width: 100%;
      height: 100%;
    }
    .return-btn {
      color: var(--primary-400);
    }
  }
`;
export default Wrapper;
