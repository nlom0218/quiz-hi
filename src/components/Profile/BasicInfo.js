import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 5 / -2;
  grid-row: 1 / 2;
  height: 150px;
  background-color: greenyellow;
`

const Username = styled.div`
`

const BasicInfo = ({ data }) => {
  const { seeProfile: { id, username, email, avatarURL, type, score, isMe } } = data
  return (<Container>
    <Username>{username}</Username>
  </Container>);
}

export default BasicInfo;