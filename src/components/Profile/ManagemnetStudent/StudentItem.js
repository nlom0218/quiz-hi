import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { processUserLevel } from '../../../sharedFn';
import LevelStep from '../../LevelStep';

const SStudentItem = styled.div`
  padding: 20px 15px;
  display: grid;
  grid-template-columns: 60px 200px 220px auto 1fr;
  column-gap: 20px;
  justify-items: flex-start;
  align-items: center;
  transition: background-color 1s ease;
  :nth-child(even) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`



const StudentNum = styled.div`
  font-weight: 600;
`

const StudentId = styled.div``

const StudentNickname = styled.div`
  color: ${props => props.theme.blueColor};
  transition: color 1s ease;
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  svg {
    font-size: 16px;
    margin-right: 15px;
  }
`

const AvatarImage = styled.img`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
`

const StudentLevel = styled.div`
  font-size: 14px;
`

const StudentEdit = styled.div`
  justify-self: flex-end;
`

const StudentItem = ({ nickname, avatarURL, index, username, score }) => {
  const level = processUserLevel(score)
  return (<SStudentItem>
    <StudentNum>{index + 1}번</StudentNum>
    <StudentId>{username}</StudentId>
    <StudentNickname>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
      {nickname}
    </StudentNickname>
    <StudentLevel>
      Lv.{level}({score})
    </StudentLevel>
    <StudentEdit>
      <FontAwesomeIcon icon={faEdit} />
    </StudentEdit>
  </SStudentItem>);
}

export default StudentItem;