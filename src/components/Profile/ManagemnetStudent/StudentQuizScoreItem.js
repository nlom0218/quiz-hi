import React from 'react';
import styled from 'styled-components';

const SStudentItem = styled.div`
  padding: 20px 15px;
  display: flex;
  :nth-child(even) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const StudentQuizScoreItem = ({ item, index, teacherQuizScoreArr, id }) => {
  const processScore = (teacher, student) => {
    const studentQuizScore = JSON.parse(student.quizScore).filter((student) => student.teacherId === id)
    const questionScore = studentQuizScore.filter((student) => student.order === teacher.order)
    if (questionScore.length === 0) {
      return "✕"
    } else {
      return `${questionScore[questionScore.length - 1].score}`
    }
  }
  return (<SStudentItem>
    <div className="student_num">{index + 1}번</div>
    <div className="student_nickname blue_color">{item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</div>
    {teacherQuizScoreArr.map((teacher, index) => {
      return <div className="quiz_title" key={index}>{processScore(teacher, item)}</div>
    })}
  </SStudentItem>);
}

export default StudentQuizScoreItem;