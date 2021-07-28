import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const Warpper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  margin-top: 10px;
  animation: ${fadeIn} 1s linear forwards;
`

const NextBtn = styled.div`
  text-align: center;
  background-color: rgb(249, 192, 134, 0.2);
  padding: 10px 0px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s linear;
    :hover {
      background-color: rgb(247, 171, 96, 0.4);
    }
`

const NextStep = ({ setNextMode }) => {
  const onClickNextBtn = (mode) => {
    setNextMode(mode)
  }

  return (<Warpper>
    <NextBtn onClick={() => onClickNextBtn("newQuestion")}>새로운 문제 만들기</NextBtn>
    <NextBtn onClick={() => onClickNextBtn("nextStep")}>3단계 진행하기</NextBtn>
  </Warpper>);
}

export default NextStep;