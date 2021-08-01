import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import QuizItem from './QuizItem';

const Container = styled.div`
  grid-column: 1 / 2;
`

const SQuizList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const NotFoundData = styled.div`
  margin-top: 20px;
  color: tomato;
`

const QuizList = ({ setPutQuiz, loading, seeQuiz }) => {
  const noData = () => {
    if (!seeQuiz || seeQuiz.quiz.length === 0) {
      return true
    }
  }
  return (<Container>
    {loading ? <div>loading...</div> : <SQuizList>
      {seeQuiz?.quiz.map((item, index) => {
        return <QuizItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </SQuizList>}
    {noData() && <NotFoundData>검색된 퀴즈가 없습니다.</NotFoundData>}
  </Container>);
}

export default QuizList;