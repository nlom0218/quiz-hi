import { useMutation } from '@apollo/client';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
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
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 10px;
    svg {
      cursor: pointer;
    }
  }
  .blue_color {
    color: ${props => props.theme.blueColor};
    transition: color 1s ease;
  }
  .quiz_detail {
    cursor: pointer;
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

const EDIT_TEACHER_QUIZ_SCORE_MUTATION = gql`
  mutation editTeacherQuizScore($id: Int!, $order: Int!) {
    editTeacherQuizScore(id: $id, order: $order) {
      ok
      error
      msg
    }
  }
`

const StudentQuizScore = ({ students, id, teacherQuizScore }) => {
  const history = useHistory()
  const teacherQuizScoreArr = JSON.parse(teacherQuizScore).sort(compare("order"))
  const onClickQuizTitle = (quizId) => {
    history.push(`/detail/quiz/${quizId}`)
  }
  const processScore = (teacher, student) => {
    const studentQuizScore = JSON.parse(student.quizScore).filter((student) => student.teacherId === id)
    const questionScore = studentQuizScore.filter((student) => student.order === teacher.order)
    if (questionScore.length === 0) {
      return "✕"
    } else {
      return `${questionScore[questionScore.length - 1].score}`
    }
  }
  const update = (cache, result) => {
    const { data: { editTeacherQuizScore: { ok, msg } } } = result
    if (ok) {
      const UserId = `User:${id}`
      cache.modify({
        id: UserId,
        fields: {
          quizScore() {
            return msg
          }
        }
      })
    }
  }
  const [editTeacherQuizScore, { loading }] = useMutation(EDIT_TEACHER_QUIZ_SCORE_MUTATION, {
    update
  })
  const onClickDeleteQuizScore = (order) => {
    if (loading) {
      return
    }
    editTeacherQuizScore({
      variables: {
        id,
        order
      }
    })
  }
  return (
    <EditProfileBox>
      <SStudentList>
        <StudentInfo>
          <div className="student_num">번호</div>
          <div className="student_nickname">이름(닉네임)</div>
          {teacherQuizScoreArr.map((item, index) => {
            return <div className="quiz_title" key={index}>
              <div onClick={() => onClickQuizTitle(item.quizId)} className="quiz_detail">
                {item.quizTitle.length > 10 ? `${item.quizTitle.substring(0, 10)}...` : item.quizTitle}
              </div>
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => onClickDeleteQuizScore(item.order)} />
            </div>
          })}
        </StudentInfo>
        {students.map((item, index) => {
          return <StudentItem key={index}>
            <div className="student_num">{index + 1}번</div>
            <div className="student_nickname blue_color">{item.nickname.length > 8 ? `${item.nickname.substring(0, 8)}...` : item.nickname}</div>
            {teacherQuizScoreArr.map((teacher, index) => {
              return <div className="quiz_title" key={index}>{processScore(teacher, item)}</div>
            })}
          </StudentItem>
        })}
      </SStudentList>
    </EditProfileBox>);
}

export default StudentQuizScore;