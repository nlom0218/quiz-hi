import { useQuery, useReactiveVar } from '@apollo/client';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { homeworkQuizIdVar, setHomeworkQuizId } from '../../../apollo';
import useUser from '../../../hooks/useUser';
import { getCreatedDay } from "../../../sharedFn"
import HomeworkInfo from './HomeworkInfo';

const SHomeworkItem = styled.div`
  display: grid;
  grid-template-columns: 140px 360px 80px 1fr;
  row-gap: 10px;
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
  background-color: ${props => props.finish ? "tomato" : props.theme.blueColor};
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

const InfoBtn = styled.div`
  justify-self: flex-end;
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


const HomeworkItem = ({ createdAt, title, mode, type, quizId, score, order, setComplete, user: student, targetScore, id, finish }) => {
  const [seeInfo, setSeeInfo] = useState(false)
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
    if (finish) {
      window.alert("종료된 퀴즈 입니다.")
      return
    }
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
  const onClickInfoBtn = () => {
    setSeeInfo(prev => !prev)
  }
  return (<SHomeworkItem>
    <Date>{getCreatedDay(createdAt)}</Date>
    <Title>{title}</Title>
    <Mode>{processMode(mode)}</Mode>
    {type === "teacher" ?
      <InfoBtn onClick={onClickInfoBtn}><FontAwesomeIcon icon={faInfoCircle} /></InfoBtn>
      :
      (!data?.seeHomeworkResult ?
        <FinishBtn finish={finish} onClick={() => onClickSolveBtn(quizId)} >{finish ? "종료됨" : "풀기"}</FinishBtn>
        :
        <ResultBtn type={type} onClick={() => onClickResultBtn(quizId)} >
          {data?.seeHomeworkResult?.score}점/{totalScore()}점
        </ResultBtn>
      )
    }
    {seeInfo &&
      <HomeworkInfo student={student} score={score} targetScore={targetScore} order={order} homeworkId={id} finish={finish} />
    }
  </SHomeworkItem>);
}

export default HomeworkItem;