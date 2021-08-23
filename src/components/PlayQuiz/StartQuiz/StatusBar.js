import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1000px 1fr;
  position: relative;
`

const Bar = styled.div`
  z-index: 0;
  grid-column: 1 / 2;
  height: 12px;
  border-radius: 10px;
  background-color: rgb(200, 200, 200, 0.4);
  align-self: flex-end;
`

const Progress = styled.div`
  width: ${props => props.width}px;
  position: absolute;
  z-index: 1;
  grid-column: 1 / ${props => props.questionNum + 1};
  height: 12px;
  border-radius: 10px;
  background-color: rgb(71, 200, 239, 0.6);
  align-self: flex-end;
`

const QuestionNum = styled.div`
  justify-self: flex-end;
  font-size: 24px;
  font-weight: 600;
`

const StatusBar = ({ questionNum, totalNum }) => {
  const width = 1000 / totalNum * questionNum
  return (<Container>
    <Bar></Bar>
    <Progress width={width}></Progress>
    <QuestionNum>{questionNum}번</QuestionNum>
  </Container>);
}

export default StatusBar;