import React from 'react';
import styled from 'styled-components';

const SInputBtn = styled.input`
  background-color: rgb(67, 216, 122, 0.9);
  opacity: ${props => props.disabled ? 0.3 : 0.9};
  text-align: center;
  font-weight: 600;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  transition: all 0.5s linear;
  cursor: pointer;
`

const InputBtn = ({ disabled }) => {
  return (
    <SInputBtn type="submit" value="로그인" disabled={disabled} />
  );
}

export default InputBtn;