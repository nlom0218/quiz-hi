import { useQuery } from '@apollo/client';
import { faBook, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import SelectQuizList from './SelectQuizList';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  row-gap: 20px;
  .leftContent {
    align-self: flex-start;
    background-color: rgb(255, 165, 0, 0.4);
    padding: 5px 10px;
    border-radius: 5px;
  }
  .rightContent {
    align-self: center;
    line-height: 20px;
  }
`

const SelectBtn = styled.div`
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
  const [quizId, setQuizId] = useState(localStorage.getItem("selectQuiz") || null)
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(quizId) },
    skip: !quizId
  })
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} /> 선택된 퀴즈</div>
      <div className="rightContent">{quizId ? data?.detailQuiz?.title : "선택된 퀴즈가 없습니다."}</div>
    </Wrapper>
    <Wrapper>
      <SelectBtn className="leftContent"><FontAwesomeIcon icon={faHandPointer} /> 퀴즈 선택하기</SelectBtn>
      <div className="rightContent">아래의 퀴즈 중 하나를 선택하세요.</div>
      <SelectQuizList setQuizId={setQuizId} />
    </Wrapper>
  </Container >);
}

export default SelectQuiz;