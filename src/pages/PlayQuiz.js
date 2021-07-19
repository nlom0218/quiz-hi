import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';
import Join from '../components/Home/Join';

const PlayQuiz = () => {
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <Join />
        <Intro />
      </BasicContainer>
    </React.Fragment>
  );
}

export default PlayQuiz;