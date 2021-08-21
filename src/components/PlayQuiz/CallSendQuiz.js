import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const SetType = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`

const TypeWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  align-items: center;
  svg {
    cursor: pointer;
  }
`

const TypeInfo = styled.div`
  justify-self: flex-start;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: ${props => props.selected ? "rgb(255, 165, 0, 0.4)" : props.theme.boxColor};
  transition: background-color 0.6s ease;
`

const CallSendQuiz = () => {
  const [type, setType] = useState("basic")
  const onClickTypeBtn = (type) => {
    setType(type)
  }
  return (<Container>
    <SetType>
      <TypeWrapper>
        <FontAwesomeIcon icon={type === "basic" ? faCheckCircle : faCircle} onClick={() => onClickTypeBtn("basic")} />
        <TypeInfo selected={type === "basic"}>설정없이 퀴즈 진행하기</TypeInfo>
      </TypeWrapper>
      <TypeWrapper>
        <FontAwesomeIcon icon={type === "call" ? faCheckCircle : faCircle} onClick={() => onClickTypeBtn("call")} />
        <TypeInfo selected={type === "call"}>학생들과 함께 퀴즈 진행하기: 학생을 선택하여 퀴즈를 진행합니다.</TypeInfo>
      </TypeWrapper>
      <TypeWrapper>
        <FontAwesomeIcon icon={type === "send" ? faCheckCircle : faCircle} onClick={() => onClickTypeBtn("send")} />
        <TypeInfo selected={type === "send"}>학생들에게 퀴즈 보내기: 학생 계정으로 퀴즈를 보냅니다.</TypeInfo>
      </TypeWrapper>
    </SetType>
  </Container>);
}

export default CallSendQuiz;