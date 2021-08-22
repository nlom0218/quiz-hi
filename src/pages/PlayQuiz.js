import { faPlay, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import CallSendQuiz from '../components/PlayQuiz/CallSendQuiz';
import PlayQuizLayout from '../components/PlayQuiz/PlayQuizLayout';
import Preview from '../components/PlayQuiz/Preview';
import SelectMode from '../components/PlayQuiz/SelectMode';
import SelectQuiz from '../components/PlayQuiz/SelectQuiz';

const ResetBtn = styled.div`
  grid-column: 7 / 12;
  justify-self: flex-end;
  background-color: rgb(255, 165, 0, 0.4);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
  svg {
    margin-right: 10px;
  }
`

const OptionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const OptionTitle = styled.div`
`

const OptionContent = styled.div`
`

const PlayQuiz = () => {
  const [quizId, setQuizId] = useState(localStorage.getItem("selectQuiz") || null)
  const [quizMode, setQuizMode] = useState(localStorage.getItem("selectMode") || null)
  const [quizList, setQuizList] = useState(JSON.parse(localStorage.getItem("quizList")) || null)
  const [students, setStduents] = useState([])
  const [type, setType] = useState(undefined)
  const onClickResetBtn = () => {
    localStorage.removeItem("selectQuiz")
    setQuizId(null)
    localStorage.removeItem("selectMode")
    setQuizMode(null)
    localStorage.removeItem("quizList")
    setQuizList(null)
    setStduents([])
    setType(undefined)
  }
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <PageTitle><FontAwesomeIcon icon={faPlay} /> 퀴즈 진행하기</PageTitle>
        <ResetBtn onClick={onClickResetBtn} ><FontAwesomeIcon icon={faRedoAlt} />초기화</ResetBtn>
        <PlayQuizLayout>
          <OptionBox>
            <OptionTitle>퀴즈 선택하기</OptionTitle>
            <OptionContent><SelectQuiz quizId={quizId} setQuizId={setQuizId} /></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>모드 선택하기</OptionTitle>
            <OptionContent><SelectMode quizMode={quizMode} setQuizMode={setQuizMode} /></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>문제, 정답 미리보기</OptionTitle>
            <OptionContent><Preview quizMode={quizMode} quizId={quizId} quizList={quizList} setQuizList={setQuizList} /></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>불러오기 / 내보내기</OptionTitle>
            <OptionContent><CallSendQuiz students={students} setStduents={setStduents} type={type} setType={setType} /></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>퀴즈 진행하기</OptionTitle>
            <OptionContent></OptionContent>
          </OptionBox>
        </PlayQuizLayout>
      </BasicContainer>
    </React.Fragment>
  );
}

export default PlayQuiz;