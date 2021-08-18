import React from 'react';
import styled from 'styled-components';
import { fadeIn, fadeOut } from '../../animation/fade';

const SErrMsg = styled.div`
  position: absolute;
  width: 320px;
  text-align: center;
  bottom: -80px;
  color: tomato;
  line-height: 20px;
  padding-bottom: 20px;
  animation: ${fadeIn} 0.6s ease;
`

const ErrMsg = ({ error }) => {
  return (<SErrMsg>{error}</SErrMsg>);
}

export default ErrMsg;