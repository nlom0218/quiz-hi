import React from 'react';
import styled from 'styled-components';
import SeeFollower from './SeeFollower';
import SeeFollowing from './SeeFollowing';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  align-items: flex-start;
`

const ProfileFollow = ({ id, totalFollow, totalFollowing }) => {
  return (<Container>
    <SeeFollower userId={id} totalFollower={totalFollow} />
    <SeeFollowing userId={id} totalFollowing={totalFollowing} />
  </Container>);
}

export default ProfileFollow;