import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { pageFadeIn } from '../animation/fade';

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  row-gap: 60px;
  position: relative;
  animation: ${pageFadeIn} 0.6s linear forwards;
`

const BasicContainer = ({ children }) => {
  return (<Container>
    {children}
  </Container>);
}

export default BasicContainer;