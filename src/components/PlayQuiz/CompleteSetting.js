import { gql, useQuery } from '@apollo/client';
import { faBook, faBookOpen, faCog, faGamepad, faShare, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const Wrapper = styled.div`
  animation: ${fadeIn} 0.6s ease;
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
    line-height: 24px;
    span {
      color: tomato;
    }
  }
`

const PlayQuizBtn = styled.div`
  text-align: center;
  background-color: rgb(255, 165, 0, 0.4);
  padding: 10px;
  border-radius: 5px;
  opacity: ${props => props.able ? "1" : "0.6"};
  cursor: ${props => props.able ? "pointer" : "not-allowed"};
  transition: opacity 0.6s ease;
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
    }
  }
`

const CompleteSetting = ({ quizId, quizMode, type, quizList, students, setStartQuiz }) => {
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
    if (type === "nomal") {
      return "설정없이 퀴즈 진행하기"
    } else if (type === "call") {
      return "학생들과 함께 퀴즈 진행하기"
    } else if (type === "send") {
      return "학생들에게 퀴즈 보내기"
    }
  }

  const processQuestionType = () => {
    if (!quizList) {
      return
    }
    const subQuestion = quizList.filter((item) => item.type === "sub").length
    const objQuestion = quizList.filter((item) => item.type === "obj").length
    const tfQuestion = quizList.filter((item) => item.type === "tf").length
    return `${subQuestion}개의 주관식 문제, ${objQuestion}개의 객관식 문제, ${tfQuestion}개의 ○ / ✕ 문제`
  }

  const questionSetting = () => {
    if (!quizMode) {
      return false
    }
    if (quizMode === "nomal") {
      return false
    }
    return true
  }
  const processConsolationQuestion = () => {
    if (!quizList) {
      return
    }
    const consolationQuestion = quizList.filter((item) => item.consolation)
    if (consolationQuestion.length !== 0) {
      return `${consolationQuestion.map((item) => `${item.order}번`).join(", ")} 문제를 패자부활전 문제로 선택하였습니다.`
    } else {
      return <span>선택된 패자부활전 문제가 없습니다.</span>
    }
  }
  const processScoreQuestion = () => {
    if (!quizList) {
      return
    }
    const scoreArr = quizList.map((item) => item.score)
    if (scoreArr.includes(undefined)) {
      return <span>모든 문제에 점수 설정이 완료되지 않았습니다.</span>
    } else {
      const totalScore = scoreArr.reduce((acc, cur) => acc + cur)
      return `개인이 얻을 수 있는 최고점은 ${totalScore}점입니다.`
    }
  }
  const joinStudents = () => {
    if (!type) {
      return false
    }
    if (type === "nomal") {
      return false
    }
    return true
  }
  const processJoinStudents = () => {
    if (students.length === 0) {
      return <span>선택된 학생이 없습니다.</span>
    } else {
      return `${students.length}명의 학생이 퀴즈에 참여합니다.`
    }
  }
  const ablePalyQuiz = () => {
    if (!quizList) {
      return false
    }
    if (!quizId && !quizList && !quizMode) {
      return false
    }
    if (quizMode === "nomal") {
      return true
    }
    if (quizMode === "goldenBell" && quizList.filter((item) => item.consolation).length === 0) {
      return false
    }
    if (quizMode === "score" && quizList.map((item) => item.score).includes(undefined)) {
      return false
    }
    if (quizMode === "cooperation" && quizList.map((item) => item.score).includes(undefined)) {
      return false
    }
    if (type !== "nomal" && students.length === 0) {
      return false
    }
    return true
  }

  const onClickPalyQuiz = () => {
    if (!ablePalyQuiz()) {
      return
    }
    if (type === "send") {
      console.log("내보내기");
    } else {
      localStorage.setItem("joinStudent", JSON.stringify(students))
      localStorage.setItem("startQuiz", true)
      setStartQuiz(true)
    }
  }
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} />퀴즈</div>
      <div className="rightContent">{quizId ? data?.detailQuiz?.title : <span>퀴즈 선택하기에서 퀴즈를 선택해 주세요.</span>}</div>
    </Wrapper>
    {quizId && <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBookOpen} />문제</div>
      <div className="rightContent">{processQuestionType()}</div>
    </Wrapper>}
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faGamepad} />모드</div>
      <div className="rightContent">{quizMode ? processQuizMode() : <span>모드 선택하기에서 모드를 선택해 주세요.</span>}</div>
    </Wrapper>
    {questionSetting() && <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faCog} />설정</div>
      <div className="rightContent">{quizMode === "goldenBell" ? processConsolationQuestion() : processScoreQuestion()}</div>
    </Wrapper>}
    {questionSetting() &&
      <React.Fragment>
        <Wrapper>
          <div className="leftContent"><FontAwesomeIcon icon={faShare} />타입</div>
          <div className="rightContent">{type ? processQuizType() : <span>진행하기 / 내보내기에서 타입를 선택해 주세요.</span>}</div>
        </Wrapper>
        {joinStudents() && <Wrapper>
          <div className="leftContent"><FontAwesomeIcon icon={faUserFriends} />학생</div>
          <div className="rightContent">{processJoinStudents()}</div>
        </Wrapper>}
      </React.Fragment>
    }
    <PlayQuizBtn able={ablePalyQuiz()} onClick={onClickPalyQuiz}>
      {type === "send" ? "퀴즈 내보내기" : "퀴즈 진행하기"}
    </PlayQuizBtn>
  </Container>);
}

export default CompleteSetting;