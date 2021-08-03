import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import QuizList from '../QuizFeed/QuizList';
import TagQuizQuestionLayout from './TagQuizQuestionLayout';

const SEE_TAG_QUIZ_QUERY = gql`
  query Query($type: String!, $id: Int!, $page: Int!) {
    seeTagQuiz(type: $type, id: $id, page: $page) {
      id
      title
      user {
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

const TagQuiz = ({ id, totalQuizzes }) => {
  const [type, setType] = useState("recent")
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [putQuiz, setPutQuiz] = useState(true)
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  const onCompleted = () => {
    if (totalQuizzes === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalQuizzes / 10)) {
      setLastPage(totalQuizzes / 10)
      return
    }
    const lastPage = Math.floor(totalQuizzes / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_TAG_QUIZ_QUERY, {
    variables: {
      type,
      page: parseInt(page),
      id
    },
    onCompleted
  })
  return (
    <TagQuizQuestionLayout
      setPutQuiz={setPutQuiz}
      page={page}
      lastPage={lastPage}
      setPage={setPage}
      setType={setType}
      type={type}
      refetch={refetch}
    >
      {loading ? <div>loading...</div> : <QuizList
        setPutQuiz={setPutQuiz}
        loading={loading}
        seeQuiz={{ quiz: data.seeTagQuiz }}
      />}
    </TagQuizQuestionLayout>
  );
}

export default TagQuiz;