import styled from "styled-components";

export const CardList = styled.div`
  display: flex;
  width: auto;
  height: 100%;
  flex-flow: column nowrap;
  justify-content: flext-start;
  align-items: stretch;
`;

export const Card = styled.div`
  overflow: hidden;
  padding: 16px;
  margin-bottom: 16px;
  flex: 0 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;
