import React from 'react';
import styled from 'styled-components';

const SPageTitle = styled.div`
  grid-column: 2 / 7;
  font-size: 24px;
  align-self: center;
  letter-spacing: 5px;
`

const PageTitle = ({ title }) => {
  return (<SPageTitle>{title}</SPageTitle>);
}

export default PageTitle;