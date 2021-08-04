import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import QuizList from '../../QuizFeed/QuizList';
import UseQuizQuestionLayout from './UseQuizQuestionLayout';

const SEE_USER_PRIVATE_QUIZ_QUERY = gql`
  query seeUserPrivateQuiz($userId: Int!, $page: Int!) {
    seeUserPrivateQuiz(userId: $userId, page: $page) {
    id
    title
    user {
      id
      nickname
      avatarURL
      username
    }
    tags {
      id
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

const PrivateQuiz = ({ state, contents, totalNum, userId }) => {
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
  const { data, loading, refetch } = useQuery(SEE_USER_PRIVATE_QUIZ_QUERY, {
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
    setPutQuiz={setPutQuiz}
  >
    {loading ? <div>loading...</div> : <QuizList
      setPutQuiz={setPutQuiz}
      loading={loading}
      seeQuiz={{ quiz: data.seeUserPrivateQuiz }}
      edit={true}
    />}
  </UseQuizQuestionLayout>);
}

export default PrivateQuiz;