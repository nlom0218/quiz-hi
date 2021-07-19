import React, { useEffect } from 'react';
import styled from 'styled-components';
import LinkBtn from '../LinkBtn';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
gsap.registerPlugin(ScrollTrigger)

const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 400px;
`

const JoinText = styled.div`
  grid-column: 1 / 3;
  margin-bottom: 10px;
`

const JoinTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
  letter-spacing: 5px;
`

const JoinMsg = styled.div`
  font-size: 16px;
  font-weight: 400;
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

const Title = styled.div`
  font-size: 24px;
`

const Msg = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

const Join = () => {
  useEffect(() => {
    gsap.from(".joinContainer", {
      duration: 1.5,
      y: "80",
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".joinContainer",
        start: "top 95%",
        // markers: true,
        // toggleActions: "restart complete reverse reset"
      }
    })
  }, [])
  return (
    <Layout className="joinContainer">
      <JoinText>
        <JoinTitle>Account</JoinTitle>
        <JoinMsg>Create Quiz with QUIZ HI</JoinMsg>
      </JoinText>
      <Box position="left">
        <Title>계정 있으신가요?</Title>
        <Msg>로그인하여 당신의 퀴즈를 공유해주세요!</Msg>
        <LinkBtn route="login" text="로그인하기" />
      </Box>
      <Box>
        <Title>계정 없으신가요?</Title>
        <Msg>회원가입하여 함께 퀴즈를 만드시는건 어때요?</Msg>
        <LinkBtn route="create-account" text="회원가입하기" />
      </Box>
    </Layout>
  );
}

export default Join;