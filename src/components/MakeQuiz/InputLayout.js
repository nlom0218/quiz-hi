import React from 'react';
import styled from 'styled-components';

const SInputLayout = styled.div`
  display: flex;
  flex-direction: column;
  .inputTitle {
    margin-bottom: 10px;
    font-size: 16px;
  }
  .subMsg {
    margin-bottom: 5px;
  }
  input {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(200, 200, 200, 0.2);
    transition: box-shadow 0.4s linear;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    }
  }
`

const InputLayout = ({ children, bgColor, fcBgColor }) => {
  return (<SInputLayout bgColor={bgColor} fcBgColor={fcBgColor}>
    {children}
  </SInputLayout>);
}

export default InputLayout;