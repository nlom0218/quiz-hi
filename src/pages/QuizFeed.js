import React, { useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';

const FeedTypeWrapper = styled.div`
  grid-column: 7 / 12;
  justify-self: flex-end;
  align-self: center;
  display: flex;
  font-size: 18px;
`

const FeedType = styled.div`
  margin-left: 20px;
  padding: 8px 40px;
  background-color: ${props => props.selected ? "rgb(201, 102, 255, 0.6 )" : "rgb(201, 102, 255, 0.2)"};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.5s linear;
`

const QuizFeed = () => {
  const [feedType, setFeedType] = useState("quiz")
  const onClickFeedType = (type) => {
    setFeedType(type)
  }
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle title="퀴즈 피드" />
      <FeedTypeWrapper>
        <FeedType onClick={() => onClickFeedType("quiz")} selected={feedType === "quiz"}>퀴즈</FeedType>
        <FeedType onClick={() => onClickFeedType("question")} selected={feedType === "question"}>문제</FeedType>
      </FeedTypeWrapper>
    </BasicContainer>
  </React.Fragment>);
}

export default QuizFeed;