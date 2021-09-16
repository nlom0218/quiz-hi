import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import SendEditDChargeMsg from './SendEditChargeMsg';

const SDetailContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const DetailContainer = ({ children, user, id, title }) => {
  return (<SDetailContainer>
    {children}
    <SendEditDChargeMsg user={user} id={id} title={title} />
  </SDetailContainer>);
}

export default DetailContainer;