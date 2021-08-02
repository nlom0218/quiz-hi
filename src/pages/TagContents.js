import React from 'react';
import styled from 'styled-components';
import TagQuestion from '../components/Detail/TagQuestion';
import TagQuiz from '../components/Detail/TagQuiz';

const Container = styled.div`
  margin-top: 20px;
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const TagContents = ({ id, totalQuizzes, totalQuestions }) => {
  console.log(id, totalQuizzes, totalQuestions);
  return (<Container>
    <TagQuiz id={id} totalQuizzes={totalQuizzes} />
    <TagQuestion id={id} />
  </Container>);
}

export default TagContents;