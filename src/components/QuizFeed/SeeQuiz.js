import React, { useState } from 'react';
import QuizFeedContainer from './QuizFeedContainer';
import QuizList from './QuizList';
import SelectTags from './SelectTags';

const SeeQuiz = ({ feedType, seeType }) => {
  const [search, setSearch] = useState("")
  const [putQuiz, setPutQuiz] = useState(true)
  const [sort, setSort] = useState("recent") // recent, likes, hits
  const [page, setPage] = useState(1)
  const [tagsArr, setTagsArr] = useState([])
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
      {seeType === "tags" && <SelectTags setTagsArr={setTagsArr} tagsArr={tagsArr} />}
      <QuizList
        seeType={seeType}
        search={search}
        sort={sort}
        setPutQuiz={setPutQuiz}
        page={page}
        setLastPage={setLastPage}
        tagsArr={tagsArr}
      />
    </QuizFeedContainer>);
}

export default SeeQuiz;