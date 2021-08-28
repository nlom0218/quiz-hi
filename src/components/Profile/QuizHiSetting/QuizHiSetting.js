import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteAccount from '../Edit/DeleteAccount';
import EditBasicInfo from '../Edit/EditBasicInfo';
import EditPrivatePage from '../Edit/EditPrivatePage';
import EidtPassword from '../Edit/EidtPassword';
import EditBasicSetting from './EditBasicSetting';

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

const QuizHiSetting = ({ homeSetting }) => {
  const [homeSettingArr, setHomeSettingArr] = useState(JSON.parse(homeSetting))
  return (<Container>
    <Title>QUIZ HI 기본 설정</Title>
    <EditBasicSetting homeSettingArr={homeSettingArr} setHomeSettingArr={setHomeSettingArr} />
    <DivisionLine></DivisionLine>
    <Title>골든벨, 협동 모드 점수 설정</Title>
    {/* <EditBasicSetting /> */}
  </Container>);
}

export default QuizHiSetting;