import React from 'react';
import styled from 'styled-components';
import { compare } from '../../../sharedFn';
import EditProfileBox from '../Edit/EditProfileBox';

const SStudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid rgb(200, 200, 200, 0.8);
`

const StudentInfo = styled.div`
  padding: 13px 15px;
  grid-column: 1 / -1;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 60px 200px 220px auto 1fr;
  column-gap: 20px;
  justify-items: flex-start;
  align-items: center;
  font-weight: 600;
  .studentEdit {
    justify-self: flex-end;
  }
`

const StudentItem = styled.div`
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

const StudentQuizScore = ({ students, id, teacherQuizScore }) => {
  const teacherQuizScoreArr = JSON.parse(teacherQuizScore).sort(compare("order"))
  console.log(teacherQuizScoreArr);
  return (
    <EditProfileBox>
      <SStudentList>
        <StudentInfo>
          <div className="profile_student_num">번호</div>
          <div className="profile_student_nickname">이름(닉네임)</div>
          {teacherQuizScoreArr.map((item, index) => {
            return <div className="profile_quiz_title" key={index}></div>
          })}
        </StudentInfo>
        {students.map((item, index) => {
          return <StudentItem key={index}></StudentItem>
        })}
      </SStudentList>
    </EditProfileBox>);
}

export default StudentQuizScore;