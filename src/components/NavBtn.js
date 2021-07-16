import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SNavBtn = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s linear;
`

const NavBtn = ({ route, text }) => {
  return (
    <Link to={`/${route}`}>
      <SNavBtn>
        {text}
      </SNavBtn>
    </Link>
  );
}

export default NavBtn;