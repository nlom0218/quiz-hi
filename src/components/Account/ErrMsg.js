import React from 'react';
import styled from 'styled-components';
import { fadeOut } from '../../animation/fade';

const SErrMsg = styled.span`
  position: absolute;
  width: 320px;
  text-align: center;
  bottom: -50px;
  color: tomato;
  animation: ${fadeOut} 4s forwards;
`

const ErrMsg = ({ error }) => {
  return (<SErrMsg>{error}</SErrMsg>);
}

export default ErrMsg;