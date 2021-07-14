import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Intro from '../components/Home/Intro';
import Join from '../components/Home/Join';



const Home = () => {
  return (<BasicContainer>
    <Intro />
    <Join />
  </BasicContainer>);
}

export default Home;