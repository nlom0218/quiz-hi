import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';
import Join from '../components/Home/Join';



const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <Intro />
        <Join />
      </BasicContainer>
    </React.Fragment>
  );
}

export default Home;