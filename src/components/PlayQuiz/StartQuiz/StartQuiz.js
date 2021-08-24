import { useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import QuestionBox from './QuestionBox';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const QuizTitle = styled.div`
  font-size: 28px;
  svg {
    margin-right: 20px;
  }
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
    }
  }
`

const StartQuiz = () => {
  const quizList = JSON.parse(localStorage.getItem("quizList"))
  const totalNum = quizList.length
  const [questionNum, setQuestionNum] = useState(parseInt(localStorage.getItem("questionNum")) || 1)
  const [student, setStduent] = useState(JSON.parse(localStorage.getItem("joinStudent")))
  console.log(student);
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: {
      id: parseInt(localStorage.getItem("selectQuiz"))
    }
  })
  return (<Container>
    <QuizTitle>
      <FontAwesomeIcon icon={faBook} />
      {data?.detailQuiz?.title.length > 40 ? `${data?.detailQuiz?.title.substring(0, 40)}...` : data?.detailQuiz?.title}
    </QuizTitle>
    <QuestionBox setQuestionNum={setQuestionNum} questionNum={questionNum} quizList={quizList} totalNum={totalNum} student={student} />
  </Container>);
}

export default StartQuiz;