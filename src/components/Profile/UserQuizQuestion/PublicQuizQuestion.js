import React from 'react';
import styled from 'styled-components';
import PublicQuestion from './PublicQuestion';
import PublicQuiz from './PublicQuiz';
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


const PublicQuizQuestion = ({ totalPublicQuiz, totalPublicQuestion, state, userId }) => {
  return (<Container className="userPublicQuizQuestion">
    <FeedListContainerGsap layout="userPublicQuizQuestion" />
    <PublicQuiz totalNum={totalPublicQuiz} state={state} contents="퀴즈" userId={userId} />
    {/* <Wrapper></Wrapper> */}
    <PublicQuestion totalNum={totalPublicQuestion} state={state} contents="문제" userId={userId} />
  </Container>);
}

export default PublicQuizQuestion;