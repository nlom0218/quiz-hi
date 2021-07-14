import React from 'react';
import styled from 'styled-components';
import typingAni from '../../animation/typingAni';
import introImg from "../../images/Home/intro.jpg"

const SIntro = styled.div`
 grid-column: 2 / 12;
 position: relative;
`

const IntroImg = styled.img`
  width: 100%;
  height: 600px;
`

const IntroText = styled.div`
  position: absolute;
  top: 0;
  width: 1000px;
  height: 600px;
  background-color: rgba(255,255,255,0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IntroTitle = styled.div`
  font-family: 'Russo One', sans-serif;
  font-size: 36px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 10px;
`

const IntroMsg = styled.div`
  font-size: 18px;
  margin-top: 20px;
  position:relative;
  display: inline-block;
  height: 18px;
  overflow: hidden;
  animation: ${typingAni} 8s steps(65, end) 1;
  font-weight: 800;
`

const Intro = () => {
  return (<SIntro>
    <IntroImg src={introImg} />
    <IntroText>
      <IntroTitle>WelCome To Quiz Hi</IntroTitle>
      <IntroMsg>
        QUIZ HI에 오신 여러분들을 환영합니다. 이 곳에서 퀴즈를 쉽고 간편하게 만들고 많은 사람들과 공유해보세요!
      </IntroMsg>
    </IntroText>
  </SIntro>);
}

export default Intro;