import React from 'react';
import styled from 'styled-components';

const SEditProfileBox = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
`

const EditProfileBox = ({ children }) => {
  return (<SEditProfileBox>
    {children}
  </SEditProfileBox>);
}

export default EditProfileBox;