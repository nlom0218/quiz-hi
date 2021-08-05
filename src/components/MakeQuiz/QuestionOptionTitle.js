import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SOptionTitle = styled.div`
  grid-column: 1 / -1;
  font-size: 18px;
  svg {
    margin-left: 10px;
    font-size: 24px;
    cursor: pointer;
  }
`

const QuestionOptionTitle = ({ option, setOption }) => {
  const onClickOption = () => {
    setOption(!option)
  }
  return (<SOptionTitle>
    <span>옵션</span>
    <FontAwesomeIcon icon={option ? faCaretUp : faCaretDown} onClick={onClickOption} />
  </SOptionTitle>);
}

export default QuestionOptionTitle;