import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import joinImg from "../../images/Home/join.jpg"

const SJoin = styled.div`
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

const LoginText = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background-color: rgb(67, 216, 122, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    margin-top: 50px;
    transition: background-color 0.3s linear;
    color: ${props => props.theme.fontColor};
    :hover {
    background-color: ${props => props.theme.fontColor};   
    color: ${props => props.theme.bgColor};
  }
  }
`

const LoginTitle = styled.div`
  font-size: 24px;
`

const LoginMsg = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

const LoginBtn = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s linear;
`

const SignUpText = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: rgb(146, 248, 185, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    margin-top: 50px;
    transition: background-color 0.3s linear;
    color: ${props => props.theme.fontColor};
    :hover {
    background-color: ${props => props.theme.fontColor};   
    color: ${props => props.theme.bgColor};
  }
  }
`

const SignUpTitle = styled.div`
  font-size: 24px;
`

const SignUpMsg = styled.div`
  margin-top: 20px;
  font-size: 18px;
`

const SignUpBtn = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s linear;
`

const Join = () => {
  return (
    <SJoin>
      <JoinText>
        <JoinTitle>Account</JoinTitle>
        <JoinMsg>Create Quiz with QUIZ HI</JoinMsg>
      </JoinText>
      <LoginText>
        <LoginTitle>계정 있으신가요?</LoginTitle>
        <LoginMsg>로그인하여 당신의 퀴즈를 공유해주세요!</LoginMsg>
        <Link to="/login">
          <LoginBtn>
            로그인하기
        </LoginBtn>
        </Link>
      </LoginText>
      <SignUpText>
        <SignUpTitle>계정 없으신가요?</SignUpTitle>
        <SignUpMsg>계정을 생성하여 함꼐 퀴즈를 만드시는건 어때요?</SignUpMsg>
        <Link to="/create-account">
          <SignUpBtn>
            계정 생성하기
        </SignUpBtn>
        </Link>
      </SignUpText>
    </SJoin>
  );
}

export default Join;