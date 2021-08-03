import React from 'react';
import styled from 'styled-components';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBook, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBar from '../QuizFeed/PageBar';
import QuizQuestionBasket from '../QuizFeed/QuizQuestionBasket';

const STagQuizQuestionLayout = styled.div`
  grid-column: 1 / -1;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 30px;
`

const Title = styled.div`
  grid-column: 1 / -1;
`

const SelectedType = styled.div`
  grid-column: 1 / 2;
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
`

const Type = styled.div`
  align-self: flex-end;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.6};
  transition: opacity 0.3s linear;
  svg {
    margin-right: 10px;
  }
`


const TagQuizQuestionLayout = ({ children, setPutQuiz, page, lastPage, setPage, setType, refetch, type }) => {
  const onClickType = (type) => {
    setType(type)
  }
  return (
    <STagQuizQuestionLayout>
      <Title><FontAwesomeIcon icon={faBook} /> 태그가 포함된 퀴즈</Title>
      <SelectedType>
        <Type onClick={() => onClickType("recent")} selected={type === "recent"}>
          <FontAwesomeIcon icon={faClock} />최근 문제 보기
        </Type>
        <Type onClick={() => onClickType("likes")} selected={type === "likes"}>
          <FontAwesomeIcon icon={faFireAlt} />인기 문제 보기
        </Type>
        <PageBar page={page} lastPage={lastPage} setPage={setPage} />
      </SelectedType>
      {children}
      <QuizQuestionBasket setPutQuiz={setPutQuiz} />
    </STagQuizQuestionLayout>
  );
}

export default TagQuizQuestionLayout;