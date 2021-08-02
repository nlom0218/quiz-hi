import React from 'react';
import styled from 'styled-components';
import QuestionItem from '../QuizFeed/QuestionItem';

const QuizCaption = styled.div`
  margin-top: ${props => props.tags ? "10px" : "20px"};
  grid-column: 1 / -1;
  grid-row: 5 / 6;
  line-height: 20px;
`

const QuestionListTitle = styled.div`
  margin-top: 40px;
  grid-column: 1 / -1;
  grid-row: 6 / 7;
`

const QuestionList = styled.div`
  display: grid;
  grid-column: 1 / -1;
  grid-row: 7 / 8;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`


const DetailQuiz = ({ caption, questions, setPutQuiz, tags }) => {
  return (<React.Fragment>
    {caption && <QuizCaption tags={tags.length !== 0 ? true : false}>{caption}</QuizCaption>}
    <QuestionListTitle>문제 목록</QuestionListTitle>
    <QuestionList>
      {questions.map((item, index) => {
        return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </QuestionList>
  </React.Fragment>);
}

export default DetailQuiz;