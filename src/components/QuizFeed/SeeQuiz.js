import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import QuizFeedContainer from './QuizFeedContainer';

const SeeQuiz = ({ feedType }) => {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("recent") // recent, likes, hits
  return (<QuizFeedContainer feedType={feedType} setSearch={setSearch} sort={sort} setSort={setSort}>
    <div>퀴즈목록</div>
  </QuizFeedContainer>);
}

export default SeeQuiz;