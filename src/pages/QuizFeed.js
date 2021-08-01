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

const QuizFeed = () => {
  const [feedType, setFeedType] = useState("quiz")
  const [seeType, setSeeType] = useState("all")
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle title="퀴즈 피드" />
      <FeedType feedType={feedType} setFeedType={setFeedType} />
      <SeeType seeType={seeType} setSeeType={setSeeType} />
      {feedType === "quiz" && <SeeQuiz feedType={feedType} seeType={seeType} />}
      {feedType === "question" && <SeeQuestion feedType={feedType} seeType={seeType} />}
    </BasicContainer>
  </React.Fragment>);
}

export default QuizFeed;