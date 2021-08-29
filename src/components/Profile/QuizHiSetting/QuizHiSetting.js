import React, { useState } from 'react';
import styled from 'styled-components';
import EditFirstPage from './EditFirstPage';
import EditFont from './EditFont';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 360px 1fr;
  row-gap: 60px;
  .delAccount {
    color: tomato;
  }
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const QuizHiSetting = ({ firstPage, fontFamily, goldenbellScore, cooperationScore, username, id }) => {
  const [firstPageW, setFirstPage] = useState(firstPage)
  const [fontFamilyW, setFontFamily] = useState(fontFamily)
  const [goldenbellScoreW, setGoldenbellScore] = useState(goldenbellScore)
  const [cooperationScoreW, setCooperationScore] = useState(cooperationScore)
  return (<Container>
    <Title>QUIZ HI 첫 페이지 설정</Title>
    <EditFirstPage firstPage={firstPageW} setFirstPage={setFirstPage} />
    <DivisionLine></DivisionLine>
    <Title>QUIZ HI 폰트 설정</Title>
    <EditFont fontFamily={fontFamilyW} setFontFamily={setFontFamily} username={username} id={id} />
    <DivisionLine></DivisionLine>
    <Title>골든벨, 협동 모드 점수 설정</Title>
    {/* <EditBasicSetting /> */}
  </Container>);
}

export default QuizHiSetting;