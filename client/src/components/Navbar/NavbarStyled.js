import styled from "styled-components";

const Wrapper = styled.header`
  height: var(--nav-height);
  display: grid;
  place-items: center;
  background: var(--white);
  position: relative;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 10;
  .nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: bolder;
    color: var(--black);
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .show-text {
    display: none;
  }
  .link {
    color: black;
    display: flex;
    align-items: center;
    padding: 0.4em;
    border-radius: 10px;
    transition: all 0.3s;
  }
  .link:hover {
    background-color: var(--primary-100);
    box-shadow: var(--shadow-3);
  }
  .cart-container {
    display: grid;
    place-items: center;
    position: relative;
    font-size: 1.5rem;
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--primary-500);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.8rem;
    padding: 10px;
  }
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 20;
    width: 130px;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--black);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .orders {
    display: none;
  }
  .show-orders {
    display: grid;
    place-items: center;
    position: absolute;
    right: 0;
    top: calc(var(--nav-height) - 17px);
    z-index: 10;
    width: clamp(300px, 30vw, 400px);
    max-height: calc(100vh - (var(--nav-height) + var(--footer-height) + 2px));
    border-top: 1px solid var(--grey-200);
    background: var(--white);
    padding: 1rem;
    text-align: center;
    overflow-y: scroll;
  }
  .logo-text {
    display: none;
    margin: 0;
    margin-left: 0.2rem;
  }
  .login-btn {
    color: var(--black);
  }
  @media (max-width: 400px) {
    .cart-value {
      display: none;
    }
  }
  @media (min-width: 720px) {
    .logo-text {
      display: block;
    }
    .show-text {
      display: inline-block;
    }
    .dropdown {
      left: 50%;
      translate: -50% 0;
    }
    .link {
      padding: 0.6em;
      font-size: 1.1rem;
    }
  }
  @media (min-width: 900px) {
    position: sticky;
    top: 0;
    .nav {
      padding-inline: 2em;
    }
    .show-orders {
      padding: 2rem;
    }
  }
`;
export default Wrapper;
