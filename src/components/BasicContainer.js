import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
`

const BasicContainer = ({ child }) => {
  return (<Container>
    {child}
  </Container>);
}

export default BasicContainer;