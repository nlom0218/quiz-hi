import React, { useState } from 'react';
import styled from 'styled-components';
import QuestionItem from '../QuizFeed/QuestionItem';

const QuizCaption = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  grid-row: 4 / 5;
  line-height: 20px;
`

const QuestionListTitle = styled.div`
  margin-top: 30px;
  grid-column: 1 / -1;
`

const QuestionList = styled.div`
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`


const DetailQuiz = ({ caption, questions, setPutQuiz }) => {
  return (<React.Fragment>
    {caption && <QuizCaption>{caption}</QuizCaption>}
    <QuestionListTitle>문제 목록</QuestionListTitle>
    <QuestionList>
      {questions.map((item, index) => {
        return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </QuestionList>
  </React.Fragment>);
}

export default DetailQuiz;