import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Furniture</span>
      </h5>
      <h5>All rights reserved</h5>
      <p className="name">by Jakub Chosa</p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: var(--footer-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--white);
  text-align: center;
  z-index: 50;
  span {
    color: var(--grey-500);
  }
  h5 {
    margin: 0.1rem;

    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  .name {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.4);
    font-weight: bold;
    margin: 0;
    margin-left: 0.3rem;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
