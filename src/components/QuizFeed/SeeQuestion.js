import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuestionList from './QuestionList';

const SeeQuestion = ({ feedType, seeType }) => {
  const [search, setSearch] = useState("")
  const [putQuiz, setPutQuiz] = useState(true)
  const [sort, setSort] = useState("recent") // recent, likes, hits
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
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
    >
      <QuestionList
        seeType={seeType}
        search={search}
        sort={sort}
        setPutQuiz={setPutQuiz}
        page={page}
        setLastPage={setLastPage}
      />
    </QuizFeedContainer>);
}

export default SeeQuestion;