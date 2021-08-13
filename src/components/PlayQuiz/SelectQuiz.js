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
  cursor: pointer;
  transition: background-color linear 0.5s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
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
  const [seeList, setSeeList] = useState(false)
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(id) },
    skip: !id
  })
  const onClickSeletBtn = () => {
    setSeeList((prev) => !prev)
  }
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} /> 선택된 퀴즈</div>
      <div className="rightContent">{id ? data?.detailQuiz?.title : "선택된 퀴즈가 없습니다."}</div>
    </Wrapper>
    <Wrapper>
      <SelectBtn className="leftContent" onClick={onClickSeletBtn}><FontAwesomeIcon icon={faHandPointer} /> 퀴즈 선택하기</SelectBtn>
    </Wrapper>
    {seeList && <SelectQuizList />}
  </Container >);
}

export default SelectQuiz;