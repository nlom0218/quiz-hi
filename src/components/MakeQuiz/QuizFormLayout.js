import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const QuizFormLayout = ({ children, bgColor }) => {
  return (<Layout bgColor={bgColor}>
    {children}
  </Layout>);
}

export default QuizFormLayout;