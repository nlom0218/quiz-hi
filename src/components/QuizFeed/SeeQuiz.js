import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuizList from './QuizList';

const SeeQuiz = ({ feedType, seeType }) => {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("recent") // recent, likes, hits
  return (<QuizFeedContainer feedType={feedType} setSearch={setSearch} sort={sort} setSort={setSort}>
    <QuizList seeType={seeType} search={search} sort={sort} />
  </QuizFeedContainer>);
}

export default SeeQuiz;