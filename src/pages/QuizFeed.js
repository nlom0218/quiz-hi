import React, { useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';

const QuizFeed = () => {
  const [feedType, setFeedType] = useState("quiz")
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle title="퀴즈 피드" />
      <FeedType feedType={feedType} setFeedType={setFeedType} />
    </BasicContainer>
  </React.Fragment>);
}

export default QuizFeed;