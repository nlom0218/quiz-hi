import React from 'react';
import styled from 'styled-components';
import EditInput from '../Edit/EditInput';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditPageForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`
const DeleteMsg = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const EditPageItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
`

const SharedBtn = styled.input`
  text-align: center;
  background-color: rgb(255, 165, 0, 0.6);
  color: ${props => props.theme.fontColor};
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
  cursor: pointer;
`

const SharedStudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: rgb(200, 200, 200, 0.2);
  column-gap: 1px;
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.2);
`

const SharedStudentItem = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.theme.boxColor}; 
  display: grid;
  grid-template-columns: 1fr auto;
  svg {
    cursor: pointer;
  }
`

const SharedStudentNickname = styled.div`

`

const SharedStudnetSend = ({ userStudents }) => {
  return (<EditPageForm>
    <DeleteMsg>
      <div className="delMsg">∙ 선택한 학생 계정을 다른 선생님과 공유합니다.</div>
      <div className="delMsg">∙ 공유받은 선생님은 선택한 학생 계정으로 퀴즈 진행, 내보내기가 가능해 집니다.</div>
    </DeleteMsg>
    <EditPageItem style={{ alignItems: "flex-start" }}>
      <div>학생 계정 선택</div>
      <SharedStudentList>
        {userStudents.map((item, index) => {
          return <SharedStudentItem key={index}>
            <SharedStudentNickname>{item.nickname}</SharedStudentNickname>
            <FontAwesomeIcon icon={faSquare} />
          </SharedStudentItem>
        })}
      </SharedStudentList>
    </EditPageItem>
    <EditPageItem style={{ alignItems: "center" }}>
      <div>공유 받을 선생님 이메일</div>
      <EditInput
        type="password"
        autoComplete="off"
      />
    </EditPageItem>
    <SharedBtn type="submit" value="공유하기" />
  </EditPageForm>);
}

export default SharedStudnetSend;