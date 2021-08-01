import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import QuestionItem from './QuestionItem';
import QuizItem from './QuizItem';

const SEE_QUESTION_QUERY = gql`
  query seeQuestion($seeType: String!, $page: Int!, $search: String, $sort: String!) {
    seeQuestion(seeType: $seeType, page: $page, search: $search, sort: $sort) {
      id
      question
      user {
        nickname
        avatarURL
        username
      }
      tags {
        name
      }
      type
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

const SQuestionList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const QuestionList = ({ seeType, search, sort, setPutQuiz, page, setLastPage }) => {
  const onCompleted = (data) => {
    if (data.seeQuestion.length < 10) {
      setLastPage(true)
    } else {
      setLastPage(false)
    }
  }
  const { data, loading } = useQuery(SEE_QUESTION_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search !== "" && { search })
    },
    onCompleted
  })
  return (<Container>
    {loading ? <div>loading...</div> : <SQuestionList>
      {data?.seeQuestion.map((item, index) => {
        return <QuestionItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </SQuestionList>}
  </Container>);
}

export default QuestionList;