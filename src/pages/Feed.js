import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';
import SeeQuestion from '../components/QuizFeed/SeeQuestion';
import SeeQuiz from '../components/QuizFeed/SeeQuiz';
import NavBtn from '../components/NavBtn';
import { useParams } from 'react-router';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';

const Feed = () => {
  const { type } = useParams()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle><FontAwesomeIcon icon={faClipboard} /> 퀴즈 피드</PageTitle>
      <FeedType feedType={type} feed={true} />
      {type === "quiz" && <SeeQuiz feedType={type} />}
      {type === "question" && <SeeQuestion feedType={type} />}
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Feed;