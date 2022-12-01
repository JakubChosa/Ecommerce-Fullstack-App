import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 3rem 1.5rem;
  margin: 4rem auto;
  @media (min-width: 620px) {
    grid-template-columns: 200px 1fr;
  }
  @media (min-width: 900px) {
    padding-inline: 2em;
  }
`;

export default Wrapper;
