import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${(props) => (props.noPadding ? "0px" : "0px 16px")};
  flex-direction: ${(props) => props.direction || "row"};
  flex: 1 1 auto;
  ${({ center }) =>
    center ? "justify-content: center; align-items: center;" : ""}
`;

export const PageHeader = styled.div`
  width: 100%;
  padding: 16px;
`;
