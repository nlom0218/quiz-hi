import React from 'react';
import styled from 'styled-components';
import PrivateQuestion from './PrivateQuestion';
import PrivateQuiz from './PrivateQuiz';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { FeedListContainerGsap } from '../../../hooks/Gsap';
gsap.registerPlugin(ScrollTrigger)


const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  row-gap: 60px;
`

const Wrapper = styled.div`
  height: 1px;
  background-color: ${props => props.theme.fontColor};
  opacity: 0.6;
`

const PrivateQuizQuestion = ({ totalPrivateQuiz, totalPrivateQuestion, state, userId }) => {
  return (<Container className="userPrivateQuizQuestion">
    <FeedListContainerGsap layout="userPrivateQuizQuestion" />
    <PrivateQuiz totalNum={totalPrivateQuiz} state={state} contents="퀴즈" userId={userId} />
    {/* <Wrapper></Wrapper> */}
    <PrivateQuestion totalNum={totalPrivateQuestion} state={state} contents="문제" userId={userId} />
  </Container>);
}

export default PrivateQuizQuestion;