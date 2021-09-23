import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 10px;
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  column-gap: 10px;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  align-items: center;
`

const Avatar = styled.div`
  justify-self: center;
  svg {
    font-size: 24px;
  }
`

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

const Nickname = styled.div``

const UserType = styled.span`
  margin-left: 10px;
  font-size: 14px;
  opacity: 0.8;
`

const FollowItem = ({ username, avatarURL, nickname, type, totalPublicQuiz, totalPublicQuestion }) => {
  console.log(totalPublicQuiz, totalPublicQuestion);
  const processType = () => {
    if (type === "teacher") {
      return "선생님"
    } else if (type === "student") {
      return "학생"
    } else if (type === "nomal") {
      return "일반인"
    }
  }
  return (<Container>
    <Avatar>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
    </Avatar>
    <Nickname>
      {nickname.length > 8 ? `${nickname.substring(0, 8)}...` : nickname}
      <UserType>
        ({processType()})
      </UserType>
    </Nickname>
  </Container>);
}

export default FollowItem;