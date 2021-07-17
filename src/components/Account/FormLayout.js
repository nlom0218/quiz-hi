import React from 'react';
import styled from 'styled-components';

const SFormLayout = styled.div`
  background-color: ${props => props.bgColor};
  padding: 20px 40px;
  box-shadow: 0px 17px 6px -14px rgb(0 0 0 / 20%);
  position: relative;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const FormLayout = ({ children, bgColor }) => {
  return (<SFormLayout bgColor={bgColor}>
    {children}
  </SFormLayout>);
}

export default FormLayout;