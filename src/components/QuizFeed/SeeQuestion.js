import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuestionList from './QuestionList';

const SeeQuestion = ({ feedType, seeType }) => {
  const [search, setSearch] = useState("")
  const [putQuiz, setPutQuiz] = useState(true)
  const [sort, setSort] = useState("recent") // recent, likes, hits
  return (<QuizFeedContainer feedType={feedType} setSearch={setSearch} sort={sort} setSort={setSort} setPutQuiz={setPutQuiz}>
    <QuestionList seeType={seeType} search={search} sort={sort} setPutQuiz={setPutQuiz} />
  </QuizFeedContainer>);
}

export default SeeQuestion;