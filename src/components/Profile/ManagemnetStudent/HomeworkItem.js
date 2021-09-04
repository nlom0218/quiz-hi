import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { getCreatedDay } from "../../../sharedFn"

const SHomeworkItem = styled.div`
  display: grid;
  grid-template-columns: 180px 360px 80px 100px;
  row-gap: 20px;
  padding: 10px 20px;
  align-items: center;
  line-height: 20px;
  :nth-child(odd) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const Date = styled.div``

const Title = styled.div`
  padding-right: 20px;
`

const Mode = styled.div``

const FinishBtn = styled.div`
  justify-self: flex-end;
  background-color: tomato;
  color: #F4F4F4;
  padding: 5px 20px;
  border-radius: 5px;
  cursor: pointer;
`


const HomeworkItem = ({ createdAt, title, mode, students, order }) => {
  const processMode = (mode) => {
    if (mode === "score") {
      return "포인트"
    } else if (mode === "cooperation") {
      return "협동"
    }
  }
  return (<SHomeworkItem>
    <Date>{getCreatedDay(createdAt)}</Date>
    <Title>{title}</Title>
    <Mode>{processMode(mode)}</Mode>
    <FinishBtn>종료</FinishBtn>
  </SHomeworkItem>);
}

export default HomeworkItem;