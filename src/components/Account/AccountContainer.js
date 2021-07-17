import React from 'react';
import styled from 'styled-components';
import { pageFadeIn } from '../../animation/fade';

const SAccountContainer = styled.div`
  height: 100vh;
  width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100px 400px 100px;
  grid-template-rows: 1fr auto 1fr;
  align-content: flex-start;
  animation: ${pageFadeIn} 0.6s linear forwards;
`

const AccountContainer = ({ children }) => {
  return (<SAccountContainer>
    {children}
  </SAccountContainer>);
}

export default AccountContainer;