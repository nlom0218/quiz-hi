import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';
import NavIcon from '../components/Home/NavIcon';
import Join from '../components/Home/Join';
import ToTopBtn from '../components/ToTopBtn';
import AccountType from '../components/Home/AccountType';
import Level from '../components/Home/Level';

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <Intro />
        <NavIcon />
        <AccountType />
        <Level />
        <Join />
      </BasicContainer>
      <ToTopBtn />
    </React.Fragment>
  );
}

export default Home;