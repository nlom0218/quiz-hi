import { useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const Container = styled.div``

const QuizTitle = styled.div`
  line-height: 24px;
  .quizTitle-column {
    display: grid;
    row-gap: 20px;
    animation: ${fadeIn} 0.6s ease;
  }
  .column-title {
    justify-self: flex-start;
    background-color: rgb(255, 165, 0, 0.4);
    padding: 5px 10px;
    border-radius: 5px;
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

const SelectQuiz = () => {
  const { id } = useParams()
  const history = useHistory()
  console.log(id);
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(id) },
    skip: !id
  })
  return (<Container>
    <QuizTitle>{id ?
      <div className="quizTitle-column">
        <div className="column-title"><FontAwesomeIcon icon={faBook} /> 선택된 퀴즈</div>
        <div className="column-content">{data?.detailQuiz?.title}</div>
      </div>
      : "선택된 퀴즈가 없습니다."}
    </QuizTitle>
    <div onClick={() => history.push("/play-quiz/39")}>39</div>
    <div onClick={() => history.push("/play-quiz/40")}>40</div>
  </Container>);
}

export default SelectQuiz;