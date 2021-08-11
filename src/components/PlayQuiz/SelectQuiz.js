import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const Container = styled.div``

const QuizTitle = styled.div``

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
    }
  }
`

const SelectQuiz = () => {
  const { id } = useParams()
  console.log(id);
  return (<Container>
    <QuizTitle>{id ? <></> : "선택된 퀴즈가 없습니다."}</QuizTitle>
  </Container>);
}

export default SelectQuiz;