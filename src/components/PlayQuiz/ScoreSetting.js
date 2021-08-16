import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const QuizSetting = styled.div`
  margin-left: 20px;
`

const SortBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const SortItem = styled.div`
  text-align: center;
  padding: 5px 10px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const ScoreSetting = () => {
  return (<QuizSetting>
    <SortBar>
      <SortItem>5점</SortItem>
      <SortItem>10점</SortItem>
      <SortItem>20점</SortItem>
      <SortItem>30점</SortItem>
    </SortBar>

  </QuizSetting>);
}

export default ScoreSetting;