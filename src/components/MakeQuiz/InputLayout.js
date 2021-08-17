import React from 'react';
import styled from 'styled-components';

const SInputLayout = styled.div`
  display: grid;
  grid-template-columns: ${props => props.updateQuestion ? "100px" : "180px"} 1fr;
  align-items: flex-start;
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

const InputLayout = ({ children, updateQuestion }) => {
  return (<SInputLayout updateQuestion={updateQuestion}>
    {children}
  </SInputLayout>);
}

export default InputLayout;