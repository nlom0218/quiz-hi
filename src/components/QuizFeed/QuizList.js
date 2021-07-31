import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import QuizItem from './QuizItem';

const SEE_QUIZ_QUERY = gql`
  query seeQuiz($seeType: String!, $page: Int!, $search: String, $sort: String!) {
    seeQuiz(seeType: $seeType, page: $page, search: $search, sort: $sort) {
      id
      title
      user {
        nickname
        avatarURL
        username
      }
      tags {
        name
      }
      questionNum
      isLiked
      likes
      hits
      createdAt
    }
  }
`

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

const QuizList = ({ seeType, search, sort, setPutQuiz }) => {
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(SEE_QUIZ_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search !== "" && { search })
    }
  })
  return (<Container>
    {loading ? <div>loading...</div> : <SQuizList>
      {data?.seeQuiz.map((item, index) => {
        return <QuizItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </SQuizList>}
  </Container>);
}

export default QuizList;