import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';
import PrivateQuizQuestion from './PrivateQuizQuestion';
import PublicQuizQuestion from './PublicQuizQuestion';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 4fr 1fr;
  row-gap: 30px;
`

const QuizQestionState = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, auto) 1fr;
  column-gap: 20px;
`

const State = styled.div`
   cursor: pointer;
   opacity: ${props => props.selected ? 1 : 0.6};
   transition: opacity 0.3s linear;
`

const UserQuizQuestion = ({ data }) => {
  const [state, setState] = useState("public")
  const { seeProfile: {
    id,
    totalPublicQuiz,
    totalPublicQuestion,
    totalPrivateQuiz,
    totalPrivateQuestion
  } } = data
  const user = useUser()
  const onClickState = (state) => {
    setState(state)
  }
  return (<Container>
    <QuizQestionState>
      <State onClick={() => { onClickState("public") }} selected={state === "public"}>
        <FontAwesomeIcon icon={faLockOpen} /> Public
      </State>
      {parseInt(id) === user.id &&
        <State onClick={() => { onClickState("private") }} selected={state === "private"}>
          <FontAwesomeIcon icon={faLock} /> Private
        </State>}
    </QuizQestionState>
    {state === "public" &&
      <PublicQuizQuestion
        totalPublicQuiz={totalPublicQuiz}
        totalPublicQuestion={totalPublicQuestion}
        state={state}
        userId={id}
      />
    }
    {state === "private" &&
      <PrivateQuizQuestion
        totalPrivateQuiz={totalPrivateQuiz}
        totalPrivateQuestion={totalPrivateQuestion}
        state={state}
        userId={id}
      />
    }
  </Container>);
}

export default UserQuizQuestion;