import React from 'react';
import styled from 'styled-components';

const SInputLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .inputTitle {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .subMsg {
    margin-bottom: 5px;
  }
  input {
    background-color: ${props => props.bgColor};
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.2s linear;
    :focus {
      background-color: ${props => props.FcBgColor}
    }
  }
`

const InputLayout = ({ children, bgColor, FcBgColor }) => {
  return (<SInputLayout bgColor={bgColor} FcBgColor={FcBgColor}>
    {children}
  </SInputLayout>);
}

export default InputLayout;