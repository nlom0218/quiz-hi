import React, { useState } from 'react';
import styled from 'styled-components';

const QuizSetting = styled.div`
  margin-left: 20px;
`

const ScoreBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 15px;
`

const ScoreItem = styled.div`
  background-color: ${props => props.selected ? "rgb(200, 200, 200, 0.2)" : props.theme.boxColor};
  text-align: center;
  padding: 5px 10px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const ScoreSetting = ({ setQuizList, order, quizList, setChange }) => {
  const onClickScoreItem = (order, score) => {
    const index = quizList.findIndex((item) => item.order === order)
    const changedQuiz = { ...quizList[index], score }
    quizList.splice(index, 1, changedQuiz)
    localStorage.setItem("quizList", JSON.stringify(quizList))
    setQuizList(quizList)
    setChange(prev => !prev)
  }
  const selectedScore = (order, score) => {
    const index = quizList.findIndex((item) => item.order === order)
    if (quizList[index].score === score) {
      return true
    } else {
      return false
    }
  }
  return (<QuizSetting>
    <ScoreBar>
      <ScoreItem onClick={() => onClickScoreItem(order, 5)} selected={selectedScore(order, 5)}>5점</ScoreItem>
      <ScoreItem onClick={() => onClickScoreItem(order, 10)} selected={selectedScore(order, 10)}>10점</ScoreItem>
      <ScoreItem onClick={() => onClickScoreItem(order, 20)} selected={selectedScore(order, 20)}>20점</ScoreItem>
      <ScoreItem onClick={() => onClickScoreItem(order, 30)} selected={selectedScore(order, 30)}>30점</ScoreItem>
    </ScoreBar>

  </QuizSetting>);
}

export default ScoreSetting;