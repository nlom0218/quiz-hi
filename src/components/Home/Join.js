import React from 'react';
import styled from 'styled-components';
import { HomeContentsLayoutGsap } from '../../hooks/Gsap';
import LinkBtn from '../LinkBtn';
import Title from './Title';

const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 400px;
`

const Box = styled.div`
  grid-column: ${props => props.position === "left" ? 1 / 2 : 2 / 3};
  grid-row: 2 / 3;
  background-color: ${props => props.position === "left" ? "rgb(67, 216, 122, 0.2)" : "rgb(146, 248, 185, 0.2)"};;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  margin-bottom: 40px;
`

const BoxTitle = styled.div`
  font-size: 24px;
`

const Msg = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

const Join = () => {
  return (
    <Layout className="joinContainer">
      <HomeContentsLayoutGsap layout="joinContainer" />
      <Title title="Account" msg="Create Quiz with QUIZ HI" left={true} />
      <Box position="left">
        <BoxTitle>계정 있으신가요?</BoxTitle>
        <Msg>로그인하여 당신의 퀴즈를 공유해주세요!</Msg>
        <LinkBtn route="login" text="로그인하기" />
      </Box>
      <Box>
        <BoxTitle>계정 없으신가요?</BoxTitle>
        <Msg>회원가입하여 함께 퀴즈를 만드시는건 어때요?</Msg>
        <LinkBtn route="create-account" text="회원가입하기" />
      </Box>
    </Layout>
  );
}

export default Join;