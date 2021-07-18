import React from 'react';
import styled from 'styled-components';

const SInputLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  span {
    margin-bottom: 10px;
  }
  svg {
    margin-left: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  input {
    background-color: rgb(67, 216, 122, 0.2);
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.2s linear;
    :focus {
      background-color: rgb(67, 216, 122, 0.6);
    }
  }
  margin-bottom: 20px;
`

const InputLayout = ({ children, bgColor }) => {
  return (<SInputLayout bgColor={bgColor}>
    {children}
  </SInputLayout>);
}

export default InputLayout;