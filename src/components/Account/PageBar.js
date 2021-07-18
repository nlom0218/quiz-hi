import React from 'react';
import styled from 'styled-components';

const SPageBar = styled.div`  
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  align-self: flex-start;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(146, 248, 185);
  border-radius: 10px;
  padding: 0px 10px;
  opacity: 0.6;
  transition: opacity 0.6s linear, background-color 0.6s linear;
  :hover {
    opacity: 1;
    background-color: rgb(146, 248, 185, 0.2);
  }
`

const PageBar = ({ children, borderColor, hoverBgColor }) => {
  return (<SPageBar borderColor={borderColor} hoverBgColor={hoverBgColor}>
    {children}
  </SPageBar>);
}

export default PageBar;