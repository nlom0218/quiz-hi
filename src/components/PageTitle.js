import React from 'react';
import styled from 'styled-components';

const SPageTitle = styled.div`
  grid-column: 1 / -1;
  font-size: 24px;
  letter-spacing: 5px;
  margin-top: 20px;
`

const PageTitle = ({ title }) => {
  return (<SPageTitle>{title}</SPageTitle>);
}

export default PageTitle;