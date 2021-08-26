import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';
import { ActionBox, BottomLine, LeaveBtn, NextStep } from './sharedStyles';

const StudentList = styled.div`
  grid-column: 1 / -1;
  margin: 0px 40px;
  max-height: 380px;
  overflow-y: scroll;
  font-size: 24px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  align-self: flex-start;
  .goldenBell_students {
    display: flex;
    flex-wrap: wrap;
    line-height: 36px;
  }
  .goldenBell_student {
    margin-right: 30px;
  }
`

const StudentMsg = styled.div`

`

const ScoreBoard = styled.div`
  margin: 0px 40px;
  max-height: 380px;
  overflow-y: scroll;
  font-size: 24px;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  align-self: flex-start;
`

const ScoreList = styled.ul`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  background-color: rgb(200, 200, 200, 0.8);
`

const ScoreItem = styled.li`
  display: grid;
  grid-template-columns: 120px auto;
  padding: 15px 20px;
  background-color: rgb(42, 140, 0);
  line-height: 36px;
  .scoreItem_students {
    display: flex;
    flex-wrap: wrap;
  }
  .scoreItem_student {
    margin-right: 30px;
  }
`

const ScoreMsg = styled.div`
  align-self: flex-end;
`

const TotalScore = styled.div`
  font-size: 20px;
  background-color: tomato;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;
`

const UPDATE_QUIZ_SCORE_MUTATION = gql`
  mutation updateQuizScore($result: String!, $teacherId: Int!, $quizTitle: String!, $quizId: Int!) {
    updateQuizScore(result: $result, teacherId: $teacherId, quizTitle: $quizTitle, quizId: $quizId) {
      ok
      error
    }
  }
`

const ResultAction = ({ student }) => {
  const history = useHistory()
  const user = useUser()
  const [save, setSave] = useState(false)
  const totalScore = student.map((item) => item.score).reduce((acc, cur) => acc + cur, 0)
  const scoreArr = student.map((item) => item.score)
    .reduce((acc, cur, i, arr) => {
      if (arr.indexOf(cur) === i) acc.push(cur)
      return acc
    }, [])
    .sort((a, b) => b - a)
  const quizMode = localStorage.getItem("selectMode")
  const onClickEndBtn = () => {
    if (window.confirm("퀴즈를 종료합니다.")) {
      localStorage.removeItem("startQuiz")
      localStorage.removeItem("joinStudent")
      localStorage.removeItem("questionNum")
      window.location.reload()
    }
  }
  const onClickMoveProfileBtn = () => {
    if (window.confirm("프로필 > 학생관리로 이동합니다.")) {
      history.push(`/profile/${user.username}/student`)
      localStorage.removeItem("startQuiz")
      localStorage.removeItem("joinStudent")
      localStorage.removeItem("questionNum")
      window.location.reload()
    }
  }

  const onCompleted = (result) => {
    const { updateQuizScore: { ok } } = result
    if (ok) {
      window.alert("퀴즈 결과가 저장되었습니다.")
      setSave(true)
    }
  }
  const [updateQuizScore, { loading }] = useMutation(UPDATE_QUIZ_SCORE_MUTATION, {
    onCompleted
  })
  const onClickSaveResult = () => {
    if (loading) {
      return
    }
    const quizId = localStorage.getItem("selectQuiz")
    const quizTitle = localStorage.getItem("selectQuizTitle")
    const resultArr = student.map((item) => {
      return { id: item.id, score: item.score }
    })
    updateQuizScore({
      variables: {
        teacherId: user.id,
        result: JSON.stringify(resultArr),
        quizId: parseInt(quizId),
        quizTitle
      }
    })
  }
  return (<ActionBox>
    <LeaveBtn></LeaveBtn>
    {quizMode === "goldenBell" ?
      <StudentList>
        <StudentMsg>골든벨을 울린 학생</StudentMsg>
        <div className="goldenBell_students">
          {student.map((item, index) => {
            if (!item.pass) { return }
            return <div key={index} className="goldenBell_student">{item.nickname}</div>
          })}
        </div>
      </StudentList>
      :
      <ScoreBoard>
        <ScoreMsg>점수판</ScoreMsg>
        {quizMode === "cooperation" && <TotalScore>총점: {totalScore}점</TotalScore>}
        <ScoreList>
          {scoreArr.map((item, index) => {
            return <ScoreItem key={index}>
              <div className="socre">{item}점</div>
              <div className="scoreItem_students">
                {student.filter((student) => student.score === item).map((student, index) => {
                  return <div className="scoreItem_student" key={index}>
                    {student.nickname}
                  </div>
                })}
              </div>
            </ScoreItem>
          })}
        </ScoreList>
      </ScoreBoard>
    }
    <NextStep>
      <div onClick={onClickEndBtn}>퀴즈 종료하기</div>
      {save ? <div onClick={onClickMoveProfileBtn}>점수 확인하기</div> :
        <div onClick={onClickSaveResult}>결과 저장하기</div>}
    </NextStep>
    <BottomLine></BottomLine>
  </ActionBox>);
}

export default ResultAction;