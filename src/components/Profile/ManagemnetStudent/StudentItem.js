import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { processUserLevel } from '../../../sharedFn';
import LevelStep from '../../LevelStep';
import StudentEditting from './StudentEditting';

const SStudentItem = styled.div`
  padding: 20px 15px;
  display: grid;
  grid-template-columns: 60px 200px 220px auto 1fr;
  column-gap: 20px;
  row-gap: 20px;
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
  svg {
    cursor: pointer;
  }
`

const StudentItem = ({ nickname, avatarURL, index, username, score, id, teacherId }) => {
  const [editMode, setEditMode] = useState(false)
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
      {nickname.length > 8 ? `${nickname.substring(0, 8)}...` : nickname}
    </StudentNickname>
    <StudentLevel>
      Lv.{level}({score})
    </StudentLevel>
    <StudentEdit>
      <FontAwesomeIcon icon={faEdit} onClick={() => setEditMode(prev => !prev)} />
    </StudentEdit>
    {editMode && <StudentEditting nickname={nickname} teacherId={teacherId} studentId={id} />}
  </SStudentItem>);
}

export default StudentItem;