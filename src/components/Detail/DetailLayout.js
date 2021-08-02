import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../sharedFn"

const SDetailQuiz = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`

const Title = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  font-size: 20px;
  line-height: 24px;
`

const UserProfile = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  display: flex;
  align-items: flex-end;
`

const AvatarImage = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const CreatedAt = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
`

const DetailLayout = ({ children, title, user: { avatarURL, nickname, id }, createdAt, caption }) => {
  return (<SDetailQuiz>
    <Title>{title}</Title>
    <UserProfile>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
      {nickname}
    </UserProfile>
    <CreatedAt>{getCreatedDay(createdAt)}</CreatedAt>
    {children}
  </SDetailQuiz>);
}


export default DetailLayout;