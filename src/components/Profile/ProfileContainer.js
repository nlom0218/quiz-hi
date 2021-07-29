import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* margin-top: 20px; */
  grid-column: 2 / 5;
  grid-row: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`

const AvatarLayout = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(to bottom right, rgb(178, 198, 255, 0.4), rgb(211, 219, 242, 0.4));
  svg {
    font-size: 200px;
    margin-bottom: 20px;
  }
`

const AvatroImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: fill;
`

const ProfileContainer = ({ data }) => {
  const { seeProfile: { id, username, email, avatarURL, type, score, isMe } } = data
  return (<Container>
    <AvatarLayout>
      {avatarURL ?
        <AvatroImage src={avatarURL} /> :
        <FontAwesomeIcon icon={faUser} />
      }
    </AvatarLayout>
  </Container>);
}

export default ProfileContainer;