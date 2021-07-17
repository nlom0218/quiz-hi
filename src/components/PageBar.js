import React from 'react';
import styled from 'styled-components';

const SPageBar = styled.div`  
  align-self: flex-start;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${props => props.borderColor};
  border-radius: 10px;
  padding: 0px 10px;
  opacity: 0.6;
  transition: all 0.6s linear;
  :hover {
    opacity: 1;
    background-color: ${props => props.hoverBgColor};
  }
`

const PageBar = ({ children, borderColor, hoverBgColor }) => {
  return (<SPageBar borderColor={borderColor} hoverBgColor={hoverBgColor}>
    {children}
  </SPageBar>);
}

export default PageBar;