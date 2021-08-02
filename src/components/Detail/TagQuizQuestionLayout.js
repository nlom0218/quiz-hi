import React from 'react';
import styled from 'styled-components';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBook, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBar from '../QuizFeed/PageBar';

const Title = styled.div``

const STagQuizQuestionLayout = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`

const SelectedType = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 20px;
`

const Type = styled.div`
  align-self: flex-end;
  svg {
    margin-right: 10px;
  }
`


const TagQuizQuestionLayout = ({ children }) => {
  return (
    <STagQuizQuestionLayout>
      <Title><FontAwesomeIcon icon={faBook} /> 태그가 포함된 퀴즈</Title>
      <SelectedType>
        <Type><FontAwesomeIcon icon={faClock} />최근 문제 보기</Type>
        <Type><FontAwesomeIcon icon={faFireAlt} />인기 문제 보기</Type>
        <PageBar />
      </SelectedType>
      {children}
    </STagQuizQuestionLayout>
  );
}

export default TagQuizQuestionLayout;