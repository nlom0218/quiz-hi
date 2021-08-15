import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const QuizSetting = styled.div`
  margin-left: 20px;
`

const GoldenBellSetting = () => {
  return (<QuizSetting><FontAwesomeIcon icon={faSquare} /></QuizSetting>);
}

export default GoldenBellSetting;