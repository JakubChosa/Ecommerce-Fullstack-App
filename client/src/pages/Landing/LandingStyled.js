import styled from "styled-components";

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  padding: 5rem 0;
  .page {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
  }
  .main-text {
    text-align: center;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
    margin-inline: auto;
  }
  .main-images {
    display: none;
  }
  .image-small {
    position: absolute;
    width: clamp(200px, 20vw, 280px);
    left: 0;
    bottom: 0;
    z-index: 3;
    border-radius: 5px;
  }
  .image-big {
    position: absolute;
    width: 80%;
    height: 100%;
    right: 0;
    z-index: 2;
    border-radius: 5px;
  }
  .bg-shape {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 90%;
    height: 70%;
    border-radius: 5px;
    background-color: var(--primary-500);
  }
  .popular-items {
    grid-column: span 2;
  }
  @media (min-width: 900px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
      padding-inline: 2em;
    }
    .main-text {
      text-align: left;
    }
    .main-images {
      display: block;
      position: relative;
      height: 300px;
      width: 400px;
      max-height: 60vh;
      justify-self: end;
    }
  }
  @media (min-width: 1100px) {
    .main-images {
      height: 400px;
      width: 500px;
    }
  }
`;
export default Wrapper;
