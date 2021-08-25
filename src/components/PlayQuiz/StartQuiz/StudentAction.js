import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { ActionBox, ActionContent, BottomLine, LeaveBtn, NextStep } from './sharedStyles';

const StudentList = styled.div`
  grid-column: 1 / -1;
  margin: 20px 40px;
  max-height: 340px;
  overflow-y: scroll;
  font-size: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  align-items: flex-start;
  .studentType {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 40px;
    row-gap: 20px;
  }
  .studentList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: rgb(200, 200, 200, 0.8);
    border: 1px solid rgb(200, 200, 200, 0.8);
    row-gap: 1px;
    column-gap: 1px;
  }
  .studentItem {
    padding: 15px 20px;
    background-color: rgb(42, 140, 0);
  }
`

const StudentMsg = styled.div`

`


const StudentAction = ({ question, setAction, student }) => {
  const quizMode = localStorage.getItem("selectMode")
  const onCLickLeaveBtn = () => {
    setAction(null)
  }
  return (<ActionBox>
    <LeaveBtn><FontAwesomeIcon icon={faTimes} onClick={onCLickLeaveBtn} /></LeaveBtn>
    {quizMode === "goldenBell" ?
      <StudentList>
        <div className="studentType">
          <StudentMsg>통과한 학생</StudentMsg>
          <div className="studentList">
            {student.map((item, index) => {
              if (!item.pass) { return }
              return <div key={index} className="studentItem">{index + 1}번 {item.nickname.length > 5 ? `${item.nickname.substring(0, 5)}...` : item.nickname}</div>
            })}
          </div>
        </div>
        <div className="studentType">
          <StudentMsg>통과하지 못한 학생</StudentMsg>
          <div className="studentList">
            {student.map((item, index) => {
              if (item.pass) { return }
              return <div key={index} className="studentItem">{index + 1}번 {item.nickname.length > 5 ? `${item.nickname.substring(0, 5)}...` : item.nickname}</div>
            })}
          </div>
        </div>
      </StudentList>
      :
      <ActionContent></ActionContent>
    }
    <NextStep></NextStep>
    <BottomLine></BottomLine>
  </ActionBox>);
}

export default StudentAction;