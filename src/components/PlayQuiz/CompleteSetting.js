import { gql, useQuery } from '@apollo/client';
import { faBook, faGamepad, faShare, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 30px;
  row-gap: 20px;
  .leftContent {
    /* justify-self: flex-start; */
    text-align: center;
    align-self: flex-start;
    background-color: rgb(255, 165, 0, 0.4);
    padding: 5px 10px;
    border-radius: 5px;
    svg {
      margin-right: 10px;
    }
  }
  .rightContent {
    align-self: center;
    line-height: 20px;
    span {
      color: tomato;
    }
  }
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
    }
  }
`

const CompleteSetting = ({ quizId, quizMode }) => {
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(quizId) },
    skip: !quizId
  })
  const processQuizMode = () => {
    if (quizMode === "nomal") {
      return "일반"
    } else if (quizMode === "goldenBell") {
      return "골든벨"
    } else if (quizMode === "score") {
      return "포인트"
    } else if (quizMode === "cooperation") {
      return "협동"
    }
  }
  const processQuizType = () => {
    if (quizMode === "basic") {
      return "설정없이 퀴즈 진행하기"
    } else if (quizMode === "call") {
      return "학생들과 함께 퀴즈 진행하기"
    } else if (quizMode === "send") {
      return "학생들에게 퀴즈 보내기"
    }
  }
  const joinStudents = () => {
    if (!quizMode) {
      return false
    }
    if (quizMode === "basic") {
      return false
    }
    return true
  }
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} />퀴즈</div>
      <div className="rightContent">{quizId ? data?.detailQuiz?.title : <span>퀴즈 선택하기에서 퀴즈를 선택해 주세요.</span>}</div>
    </Wrapper>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faGamepad} />모드</div>
      <div className="rightContent">{quizMode ? processQuizMode() : <span>모드 선택하기에서 모드를 선택해 주세요.</span>}</div>
    </Wrapper>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faShare} />타입</div>
      <div className="rightContent">{quizMode ? processQuizType() : <span>불러오기 / 내보내기에서 타입를 선택해 주세요.</span>}</div>
    </Wrapper>
    {joinStudents() && <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faUserFriends} />학생</div>
      <div className="rightContent">{quizMode ? processQuizType() : <span>불러오기 / 내보내기에서 타입를 선택해 주세요.</span>}</div>
    </Wrapper>}
  </Container>);
}

export default CompleteSetting;