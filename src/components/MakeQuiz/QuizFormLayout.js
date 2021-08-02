import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  padding: 30px 50px;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  transition: border 1s ease;
`

const QuizFormLayout = ({ children, bgColor }) => {
  return (<Layout bgColor={bgColor}>
    {children}
  </Layout>);
}

export default QuizFormLayout;