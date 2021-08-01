import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuizList from './QuizList';

const SeeQuiz = ({ feedType, seeType }) => {
  const [search, setSearch] = useState("")
  const [putQuiz, setPutQuiz] = useState(true)
  const [sort, setSort] = useState("recent") // recent, likes, hits
  const [page, setPage] = useState(1)
  return (<QuizFeedContainer feedType={feedType} setSearch={setSearch} sort={sort} setSort={setSort} setPutQuiz={setPutQuiz} setPage={setPage}>
    <QuizList seeType={seeType} search={search} sort={sort} setPutQuiz={setPutQuiz} page={page} />
  </QuizFeedContainer>);
}

export default SeeQuiz;