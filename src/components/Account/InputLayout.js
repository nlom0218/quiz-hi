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
    background-color: ${props => props.bgColor};
    padding: 10px 20px;
    border-radius: 5px;
  }
  margin-bottom: 20px;
`

const InputLayout = ({ children, bgColor }) => {
  return (<SInputLayout bgColor={bgColor}>
    {children}
  </SInputLayout>);
}

export default InputLayout;