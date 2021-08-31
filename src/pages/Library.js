import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import FeedType from '../components/QuizFeed/FeedType';

const Library = () => {
  const { type } = useParams()
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <PageTitle><FontAwesomeIcon icon={faBookReader} /> 라이브러리</PageTitle>
        <FeedType feedType={type} />
      </BasicContainer>
    </React.Fragment>
  );
}

export default Library;