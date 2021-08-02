import React from 'react';
import styled from 'styled-components';

const SDetailContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const DetailContainer = ({ children }) => {
  return (<SDetailContainer>
    {children}
  </SDetailContainer>);
}

export default DetailContainer;