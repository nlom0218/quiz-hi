import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';

const PlayQuiz = () => {
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <Intro />
      </BasicContainer>
    </React.Fragment>
  );
}

export default PlayQuiz;