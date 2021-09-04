import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';
import { getCreatedDay } from "../../../sharedFn"

const SHomeworkItem = styled.div`
  display: grid;
  grid-template-columns: 180px 360px 80px 100px;
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


const HomeworkItem = ({ createdAt, title, mode, type, quizId, score }) => {
  const history = useHistory()
  const user = useUser()
  const processMode = (mode) => {
    if (mode === "score") {
      return "포인트"
    } else if (mode === "cooperation") {
      return "협동"
    }
  }
  const onClickSolveBtn = (quizId) => {
    if (type === "teacher") {
      return
    }
    localStorage.setItem("homeworkScore", score)
    history.push(`/profile/${user?.username}/homework/${quizId}`)
  }
  return (<SHomeworkItem>
    <Date>{getCreatedDay(createdAt)}</Date>
    <Title>{title}</Title>
    <Mode>{processMode(mode)}</Mode>
    {type === "teacher" ?
      <FinishBtn type={type}>종료</FinishBtn>
      :
      <FinishBtn type={type} onClick={() => onClickSolveBtn(quizId)} >풀기</FinishBtn>
    }
  </SHomeworkItem>);
}

export default HomeworkItem;