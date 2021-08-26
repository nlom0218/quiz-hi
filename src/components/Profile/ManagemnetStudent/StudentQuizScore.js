import React from 'react';
import styled from 'styled-components';
import { compare } from '../../../sharedFn';
import EditProfileBox from '../Edit/EditProfileBox';

const SStudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid rgb(200, 200, 200, 0.8);
  width: 760px;
  overflow-x: auto;
  .student_num {
    min-width: 80px;
    font-weight: 600;
  }
  .student_nickname {
    min-width: 200px;
    font-weight: 600;
  }
  .quiz_title {
    width: 200px;
    min-width: 200px;
    padding-right: 10px;
  }
  .blue_color {
    color: ${props => props.theme.blueColor};
    transition: color 1s ease;
  }
`

const StudentInfo = styled.div`
  padding: 13px 15px;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: flex;
  font-weight: 600;
`

const StudentItem = styled.div`
  padding: 20px 15px;
  display: flex;
  :nth-child(even) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const StudentQuizScore = ({ students, id, teacherQuizScore }) => {
  const teacherQuizScoreArr = JSON.parse(teacherQuizScore).sort(compare("order"))
  console.log(students);
  return (
    <EditProfileBox>
      <SStudentList>
        <StudentInfo>
          <div className="student_num">번호</div>
          <div className="student_nickname">이름(닉네임)</div>
          {teacherQuizScoreArr.map((item, index) => {
            return <div className="quiz_title" key={index}>
              {item.quizTitle.length > 10 ? `${item.quizTitle.substring(0, 10)}...` : item.quizTitle}
            </div>
          })}
        </StudentInfo>
        {students.map((item, index) => {
          return <StudentItem key={index}>
            <div className="student_num">{index + 1}번</div>
            <div className="student_nickname blue_color">{item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</div>
            {JSON.parse(item.quizScore).sort(compare("order")).map((item, index) => {
              return <div className="quiz_title" key={index}>{item.score}점</div>
            })}
          </StudentItem>
        })}
      </SStudentList>
    </EditProfileBox>);
}

export default StudentQuizScore;