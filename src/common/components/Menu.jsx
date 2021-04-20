import styled from "styled-components";

// Idealmente se esconderia em telas menores
export const Menu = styled.nav`
  min-width: fit-content;
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    min-width: 30%;
  }
`;

export const MenuFooter = styled.div`
  flex-shrink: 0;
`;

export const MenuContent = styled.div`
  flex: 1 0 auto;
`;

export const MenuItem = styled.div`
  padding: 16px;
  min-width: fit-content;
`;
