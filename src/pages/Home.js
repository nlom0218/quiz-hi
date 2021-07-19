import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';
import IntroIcon from '../components/Home/IntroIcon';
import Join from '../components/Home/Join';

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <Intro />
        <IntroIcon />
        <Join />
      </BasicContainer>
    </React.Fragment>
  );
}

export default Home;