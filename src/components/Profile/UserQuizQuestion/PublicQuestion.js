import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import QuestionList from '../../QuizFeed/QuestionList';
import UseQuizQuestionLayout from './UseQuizQuestionLayout';

const SEE_USER_PUBLIC_QUESTION_QUERY = gql`
  query seeUserPublicQuestion($userId: Int!, $page: Int!) {
    seeUserPublicQuestion(userId: $userId, page: $page) {
      id
      question
      user {
        nickname
        avatarURL
        username
      }
      tags {
        id
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

const PublicQuestion = ({ state, contents, totalNum, userId }) => {
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(true)
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  const onCompleted = () => {
    if (totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalNum / 10)) {
      setLastPage(totalNum / 10)
      return
    }
    const lastPage = Math.floor(totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_USER_PUBLIC_QUESTION_QUERY, {
    variables: {
      page: parseInt(page),
      userId
    },
    onCompleted
  })
  return (<UseQuizQuestionLayout
    state={state}
    totalNum={totalNum}
    contents={contents}
    page={page}
    lastPage={lastPage}
    setPage={setPage}
    setPutQuiz={setPutQuiz}>
    {loading ? <div>loading...</div> : <QuestionList
      setPutQuiz={setPutQuiz}
      loading={loading}
      seeQuestion={{ question: data.seeUserPublicQuestion }}
    />}
  </UseQuizQuestionLayout>);
}

export default PublicQuestion;