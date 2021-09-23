import React from 'react';
import styled from 'styled-components';

const SInputBtn = styled.input`
  /* width: 100%; */
  background-color: ${props => props.bgColor ? props.bgColor : "rgb(200, 200, 200, 0.6)"};
  opacity: ${props => props.disabled ? 0.4 : 1};
  text-align: center;
  font-weight: 600;
  padding: 10px 0px;
  /* margin-top: 10px; */
  border-radius: 5px;
  transition: opacity 0.6s linear;
  cursor: pointer;
`

const InputBtn = ({ disabled, value, bgColor }) => {
  return (
    <SInputBtn type="submit" value={value} disabled={disabled} bgColor={bgColor} />
  );
}

export default InputBtn;