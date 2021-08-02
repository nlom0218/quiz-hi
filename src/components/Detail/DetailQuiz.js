import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { checkAllQuestionsBasketBtn, onClickAllQuestionsBasketBtn } from '../QuizFeed/basketFn';
import QuestionItem from '../QuizFeed/QuestionItem';

const QuizCaption = styled.div`
  margin-top: ${props => props.tags ? "10px" : "20px"};
  grid-column: 1 / -1;
  grid-row: 5 / 6;
  line-height: 20px;
`

const QuestionListTitle = styled.div`
  margin-top: 40px;
  grid-column: 1 / 2;
  grid-row: 6 / 7;
`

const Basket = styled.div`
    grid-column: 2 / 3;
  grid-row: 6 / 7;
  align-self: flex-end;
  justify-self: flex-end;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
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
  const questionIdTitle = questions.map((item) => {
    return { question: item.question, id: item.id }
  })
  return (<React.Fragment>
    {caption && <QuizCaption tags={tags.length !== 0 ? true : false}>{caption}</QuizCaption>}
    <QuestionListTitle>문제 목록</QuestionListTitle>
    <Basket>
      장바구니에 모두 담기
    <FontAwesomeIcon
        icon={faSquare}
        icon={checkAllQuestionsBasketBtn(questionIdTitle) ? faCheckSquare : faSquare}
        onClick={() => {
          onClickAllQuestionsBasketBtn(questionIdTitle)
          setPutQuiz(prev => !prev)
        }}
      />
    </Basket>
    <QuestionList>
      {questions.map((item, index) => {
        return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </QuestionList>
  </React.Fragment>);
}

export default DetailQuiz;