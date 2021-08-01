import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import QuizItem from './QuizItem';

const SEE_QUIZ_QUERY = gql`
  query seeQuiz($seeType: String!, $page: Int!, $search: String, $sort: String!, $tags: String) {
    seeQuiz(seeType: $seeType, page: $page, search: $search, sort: $sort, tags: $tags) {
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

const NotFoundData = styled.div`
  margin-top: 20px;
  color: tomato;
`

const QuizList = ({ seeType, search, sort, setPutQuiz, page, setLastPage, tagsArr }) => {
  const onCompleted = (data) => {
    if (data.seeQuiz.length < 10) {
      setLastPage(true)
    }
  }
  const { data, loading } = useQuery(SEE_QUIZ_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search !== "" && { search }),
      ...(tagsArr.length !== 0 && { tags: tagsArr.join(",") })
    },
    onCompleted
  })
  return (<Container>
    {loading ? <div>loading...</div> : <SQuizList>
      {data?.seeQuiz.map((item, index) => {
        return <QuizItem key={index} {...item} setPutQuiz={setPutQuiz} />
      })}
    </SQuizList>}
    {!data && <NotFoundData>퀴즈를 찾을 수 없습니다.</NotFoundData>}
  </Container>);
}

export default QuizList;