import React from 'react';
import styled from 'styled-components';
import SeeFollower from './SeeFollower';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  align-items: flex-start;
`

const ProfileFollow = ({ userId }) => {
  return (<Container>
    <SeeFollower userId={userId} />
    <div>dfsf</div>
  </Container>);
}

export default ProfileFollow;