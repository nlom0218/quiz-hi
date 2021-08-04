import React from 'react';
import styled from 'styled-components';
import QuestionItem from './QuestionItem';

const Container = styled.div`
  grid-column: 1 / 2;
`

const SQuestionList = styled.div`
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

const QuestionList = ({ seeQuestion, loading, setPutQuiz, edit }) => {
  const noData = () => {
    if (!seeQuestion || seeQuestion.question.length === 0) {
      return true
    }
  }
  return (<Container>
    {loading ? <div>loading...</div> : <SQuestionList>
      {seeQuestion?.question?.map((item, index) => {
        return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} edit={edit} />
      })}
    </SQuestionList>}
    {noData() && <NotFoundData>검색된 문제가 없습니다.</NotFoundData>}
  </Container>);
}

export default QuestionList;