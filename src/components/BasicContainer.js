import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top:20px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
`

const BasicContainer = ({ children }) => {
  return (<Container>
    {children}
  </Container>);
}

export default BasicContainer;