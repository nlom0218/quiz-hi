import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MoveTopScreen } from '../sharedFn';

const SNavBtn = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 50px;
  color: ${props => props.theme.fontColor};
  transition: all 0.5s linear;
  :hover {
  background-color: ${props => props.theme.fontColor};   
  color: ${props => props.theme.bgColor};
  }
`

const LinkBtn = ({ route, text }) => {
  return (
    <Link to={`/${route}`} onClick={() => MoveTopScreen()}>
      <SNavBtn>
        {text}
      </SNavBtn>
    </Link>
  );
}

export default LinkBtn;