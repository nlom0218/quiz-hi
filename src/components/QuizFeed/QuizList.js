import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import QuizItem from './QuizItem';

const SEE_QUIZ_QUERY = gql`
  query seeQuiz($seeType: String!, $page: Int!, $search: String, $sort: String!) {
    seeQuiz(seeType: $seeType, page: $page, search: $search, sort: $sort) {
      title
    }
  }
`

const Container = styled.div`
  grid-column: 1 / 2;
`

const SQuizList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const QuizList = ({ seeType, search, sort }) => {
  console.log(seeType, sort);
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(SEE_QUIZ_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search !== "" && { search })
    }
  })
  console.log(data);
  return (<Container>
    {loading ? <div>loading...</div> : <SQuizList>
      {data?.seeQuiz.map((item, index) => {
        return <QuizItem key={index} {...item} />
      })}
    </SQuizList>}
  </Container>);
}

export default QuizList;