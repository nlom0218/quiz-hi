import React, { useState } from 'react';
import styled from 'styled-components';
import QuizFeedContainer from './QuizFeedContainer';
import QuizList from './QuizList';

const SeeQuiz = ({ feedType, seeType }) => {
  const [search, setSearch] = useState("")
  const [putQuiz, setPutQuiz] = useState(true)
  const [sort, setSort] = useState("recent") // recent, likes, hits
  return (<QuizFeedContainer feedType={feedType} setSearch={setSearch} sort={sort} setSort={setSort} setPutQuiz={setPutQuiz}>
    <QuizList seeType={seeType} search={search} sort={sort} setPutQuiz={setPutQuiz} />
  </QuizFeedContainer>);
}

export default SeeQuiz;