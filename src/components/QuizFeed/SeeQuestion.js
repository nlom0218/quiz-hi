import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuestionList from './QuestionList';
import SelectTags from './SelectTags';
import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/client';

const SEE_QUESTION_QUERY = gql`
  query seeQuestion($seeType: String!, $page: Int!, $search: String, $sort: String!, $tags: String) {
    seeQuestion(seeType: $seeType, page: $page, search: $search, sort: $sort, tags: $tags) {
      totalNum
      question {
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
  }
`


const SeeQuestion = ({ feedType }) => {
  const [seeType, setSeeType] = useState("all")
  const [putQuiz, setPutQuiz] = useState(true)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("recent")
  const [page, setPage] = useState(1)
  const [tagsArr, setTagsArr] = useState([])
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = (data) => {
    if (Number.isInteger(data.seeQuestion.totalNum)) {
      setLastPage(data.seeQuestion.totalNum / 10)
      return
    }
    const lastPage = Math.floor(data.seeQuestion.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_QUESTION_QUERY, {
    variables: {
      seeType,
      sort,
      page: parseInt(page),
      ...(search !== "" && { search }),
      ...(tagsArr.length !== 0 && { tags: tagsArr.join(",") })
    },
    onCompleted
  })
  return (
    <QuizFeedContainer
      feedType={feedType}
      setSearch={setSearch}
      sort={sort}
      setSort={setSort}
      setPutQuiz={setPutQuiz}
      setPage={setPage}
      page={page}
      lastPage={lastPage}
      tagsArr={tagsArr}
      seeType={seeType}
      setSeeType={setSeeType}
    >
      {seeType === "tags" && <SelectTags setTagsArr={setTagsArr} tagsArr={tagsArr} setPage={setPage} refetch={refetch} />}
      <QuestionList
        {...data}
        loading={loading}
        setPutQuiz={setPutQuiz}
      />
    </QuizFeedContainer>
  );
}

export default SeeQuestion;