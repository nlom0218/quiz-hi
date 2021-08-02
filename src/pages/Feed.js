import { faBook, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';
import SeeQuestion from '../components/QuizFeed/SeeQuestion';
import SeeQuiz from '../components/QuizFeed/SeeQuiz';
import SeeType from '../components/QuizFeed/SeeType';
import NavBtn from '../components/NavBtn';

const Feed = () => {
  const [feedType, setFeedType] = useState("quiz")
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle title="퀴즈 피드" />
      <FeedType feedType={feedType} setFeedType={setFeedType} />
      {feedType === "quiz" && <SeeQuiz feedType={feedType} />}
      {feedType === "question" && <SeeQuestion feedType={feedType} />}
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Feed;