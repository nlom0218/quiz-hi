import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import PageBar from '../../QuizFeed/PageBar';
import QuizList from '../../QuizFeed/QuizList';
import QuizQuestionBasket from '../../QuizFeed/QuizQuestionBasket';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto 1fr;
  column-gap: 30px;
  row-gap: 20px;
`

const Wrapper = styled.div`
  grid-column: 1 / 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const Title = styled.div`
  svg {
    margin-right: 10px;
  }
`

const UseQuizQuestionLayout = ({ children, state, totalNum, contents, page, lastPage, setPage, setPutQuiz, }) => {
  return (<Container>
    <Wrapper>
      <Title>
        <FontAwesomeIcon icon={state === "public" ? faLockOpen : faLock} />
        {totalNum}개의 {contents}
      </Title>
      <PageBar page={page} lastPage={lastPage} setPage={setPage} />
    </Wrapper>
    {children}
    <QuizQuestionBasket setPutQuiz={setPutQuiz} />
  </Container>);
}

export default UseQuizQuestionLayout;