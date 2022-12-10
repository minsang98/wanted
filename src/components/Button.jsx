import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  width: ${({ style }) => (style && style.width ? style.width : "300px")};
  height: ${({ style }) => (style && style.height ? style.height : "40px")};
  cursor: ${({ style }) => (style && style.cursor ? "pointer" : "not-allowed")};
  background: ${({ style }) => (style && style.cursor ? "#f5d042" : "#d9d9d9")};
  border-radius: 5px;
  border: 1px solid #d9d9d9;
`;

function Button({ children, style, onClick }) {
  return (
    <ButtonComponent style={style} onClick={onClick}>
      {children}
    </ButtonComponent>
  );
}

export default Button;
