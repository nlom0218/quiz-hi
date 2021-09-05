import { useQuery, useReactiveVar } from '@apollo/client';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { homeworkQuizIdVar, setHomeworkQuizId } from '../../../apollo';
import useUser from '../../../hooks/useUser';
import { getCreatedDay } from "../../../sharedFn"

const SHomeworkItem = styled.div`
  display: grid;
  grid-template-columns: 140px 360px 80px 1fr;
  row-gap: 20px;
  padding: 10px 20px;
  align-items: center;
  line-height: 20px;
  :nth-child(odd) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const Date = styled.div``

const Title = styled.div`
  padding-right: 20px;
`

const Mode = styled.div``

const FinishBtn = styled.div`
  justify-self: flex-end;
  background-color: ${props => props.type === "teacher" ? "tomato" : props.theme.blueColor};
  color: ${props => props.type === "teacher" ? "#F4F4F4" : props.theme.bgColor};
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 1s ease, color 1s ease;
`

const ResultBtn = styled.div`
  justify-self: flex-end;
  text-decoration: underline;
  cursor: pointer;
`

const SEE_HOMEWORKRESULT_QUERY = gql`
  query seeHomeworkResult($userId: Int!, $quizId: Int!) {
    seeHomeworkResult(userId: $userId, quizId: $quizId) {
      id
      result
      score
      quiz {
        title
      }
    }
  }
`


const HomeworkItem = ({ createdAt, title, mode, type, quizId, score, order, setComplete }) => {
  const history = useHistory()
  const user = useUser()
  const { data, loading } = useQuery(SEE_HOMEWORKRESULT_QUERY, {
    variables: {
      userId: user.id,
      quizId
    }
  })
  const processMode = (mode) => {
    if (mode === "score") {
      return "포인트"
    } else if (mode === "cooperation") {
      return "협동"
    }
  }
  const onClickSolveBtn = (quizId) => {
    if (quizId === parseInt(localStorage.getItem("homeworkQuizId"))) {
      return
    }
    if (type === "teacher") {
      return
    }
    localStorage.setItem("homeworkScore", score)
    localStorage.setItem("homeworkOrder", order)
    localStorage.setItem("homeworkQuizId", quizId)
    localStorage.removeItem("homeworkResult")
    setHomeworkQuizId(quizId)
    setComplete(false)
  }
  const onClickResultBtn = (quizId) => {
    if (quizId === parseInt(localStorage.getItem("homeworkQuizId"))) {
      return
    }
    if (loading) {
      return
    }
    if (type === "teacher") {
      return
    }
    const { seeHomeworkResult: { result, score } } = data
    localStorage.setItem("homeworkResult", result)
    localStorage.setItem("homeworkScore", score)
    localStorage.setItem("homeworkQuizId", quizId)
    setHomeworkQuizId(quizId)
    setComplete(false)
  }
  const totalScore = () => {
    return JSON.parse(score).map((item) => parseInt(item.score)).reduce((acc, cur) => acc + cur, 0)
  }
  return (<SHomeworkItem>
    <Date>{getCreatedDay(createdAt)}</Date>
    <Title>{title}</Title>
    <Mode>{processMode(mode)}</Mode>
    {type === "teacher" ?
      <FinishBtn type={type}>종료</FinishBtn>
      :
      (!data?.seeHomeworkResult ?
        <FinishBtn type={type} onClick={() => onClickSolveBtn(quizId)} >풀기</FinishBtn>
        :
        <ResultBtn type={type} onClick={() => onClickResultBtn(quizId)} >
          {data?.seeHomeworkResult?.score}점/{totalScore()}점
        </ResultBtn>
      )
    }
  </SHomeworkItem>);
}

export default HomeworkItem;