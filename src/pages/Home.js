import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Intro from '../components/Home/Intro';
import NavIcon from '../components/Home/NavIcon';
import Join from '../components/Home/Join';
import NavBtn from '../components/NavBtn';
import AccountType from '../components/Home/AccountType';
import Level from '../components/Home/Level';
import styled from 'styled-components';

const HomeContainer = styled.div`
  width: 1200px;
  /* height: 100vh; */
  margin: 0 auto;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  row-gap: 60px;
  position: relative;
`

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <HomeContainer>
        <Intro />
        <NavIcon />
        <AccountType />
        <Level />
        <Join />
      </HomeContainer>
      <NavBtn />
    </React.Fragment>
  );
}

export default Home;