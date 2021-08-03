import React from 'react';
import styled from 'styled-components';
import TagQuestion from './TagQuestion';
import TagQuiz from './TagQuiz';

const Container = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 4fr 1fr;
  row-gap: 60px;
`

const TagContents = ({ id, totalQuizzes, totalQuestions }) => {
  return (<Container>
    <TagQuiz id={id} totalQuizzes={totalQuizzes} />
    <TagQuestion id={id} totalQuestions={totalQuestions} />
  </Container>);
}

export default TagContents;