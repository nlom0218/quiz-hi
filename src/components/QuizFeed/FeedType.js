import React from 'react';
import styled from 'styled-components';

const FeedTypeWrapper = styled.div`
  grid-column: 7 / 12;
  justify-self: flex-end;
  align-self: center;
  display: flex;
  font-size: 18px;
`

const SFeedType = styled.div`
  margin-left: 20px;
  padding: 5px 20px;
  background-color: ${props => props.selected ? "rgb(201, 102, 255, 0.6 )" : "rgb(201, 102, 255, 0.2)"};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s linear;
`

const FeedType = ({ feedType, setFeedType }) => {
  const onClickFeedType = (type) => {
    setFeedType(type)
  }
  return (<FeedTypeWrapper>
    <SFeedType onClick={() => onClickFeedType("quiz")} selected={feedType === "quiz"}>퀴즈</SFeedType>
    <SFeedType onClick={() => onClickFeedType("question")} selected={feedType === "question"}>문제</SFeedType>
  </FeedTypeWrapper>);
}

export default FeedType;