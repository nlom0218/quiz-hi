import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuizList from './QuizList';
import SeeType from './SeeType';
import SelectTags from './SelectTags';

const SEE_QUIZ_QUERY = gql`
  query seeQuiz($seeType: String!, $page: Int!, $search: String, $sort: String!, $tags: String) {
    seeQuiz(seeType: $seeType, page: $page, search: $search, sort: $sort, tags: $tags) {
     totalNum
     quiz {
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
  }
`

const SeeQuiz = ({ feedType }) => {
  const [seeType, setSeeType] = useState("all")
  const [search, setSearch] = useState("")
  const [putQuiz, setPutQuiz] = useState(true)
  const [sort, setSort] = useState("recent")
  const [page, setPage] = useState(1)
  const [tagsArr, setTagsArr] = useState([])
  const [lastPage, setLastPage] = useState(null)
  const onCompleted = (data) => {
    const lastPage = Math.floor(data.seeQuiz.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading, refetch } = useQuery(SEE_QUIZ_QUERY, {
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
      <QuizList
        {...data}
        loading={loading}
        setPutQuiz={setPutQuiz}
      />
    </QuizFeedContainer>
  );
}

export default SeeQuiz;