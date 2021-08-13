import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import PlayQuizLayout from '../components/PlayQuiz/PlayQuizLayout';
import SelectQuiz from '../components/PlayQuiz/SelectQuiz';

const OptionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  background-color: ${props => props.theme.boxColor};
`

const OptionTitle = styled.div`
`

const OptionContent = styled.div`
`

const PlayQuiz = () => {
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        <PageTitle><FontAwesomeIcon icon={faPlay} /> 퀴즈 진행하기</PageTitle>
        <PlayQuizLayout>
          <OptionBox>
            <OptionTitle>퀴즈 선택하기</OptionTitle>
            <OptionContent><SelectQuiz /></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>모드 선택하기</OptionTitle>
            <OptionContent></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>문제, 정답 미리보기</OptionTitle>
            <OptionContent></OptionContent>
          </OptionBox>
          <OptionBox>
            <OptionTitle>타이머 설정하기</OptionTitle>
            <OptionContent></OptionContent>
          </OptionBox>
        </PlayQuizLayout>
      </BasicContainer>
    </React.Fragment>
  );
}

export default PlayQuiz;