import { gql, useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import PreviewList from './PreviewList';

const Container = styled.div`
  display: grid;
  row-gap: 30px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  row-gap: 20px;
  .leftContent {
    align-self: flex-start;
    background-color: rgb(255, 165, 0, 0.4);
    padding: 5px 10px;
    border-radius: 5px;
  }
  .rightContent {
    align-self: center;
    line-height: 20px;
  }
`

const ConsolationQuestion = styled.div`
  justify-self: center;
  color: tomato;
`

const DETATIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      questions {
        id
        type
        question
        answer
        distractor
        hint
        image
      }
    }
  }
`

const Preview = ({ quizMode, quizId, quizList, setQuizList }) => {
  const [change, setChange] = useState(true)
  const onCompleted = () => {
    const quizList = data.detailQuiz.questions.map((item, index) => {
      return {
        order: index + 1,
        type: item.type,
        question: item.question,
        answer: item.answer,
        distractor: item.distractor,
        hint: item.hint,
        image: item.image,
      }
    })
    localStorage.setItem("quizList", JSON.stringify(quizList))
    setQuizList(quizList)
  }
  const { data, loading } = useQuery(DETATIL_QUIZ_QUERY, {
    variables: { id: parseInt(quizId) },
    skip: !quizId,
    onCompleted
  })
  const processQuizMode = () => {
    if (quizMode === "nomal") {
      return "일반모드를 선택하였습니다."
    } else if (quizMode === "goldenBell") {
      return "골든벨모드를 선택하였습니다. 패자부활전 문제를 선택해주세요."
    } else if (quizMode === "score") {
      return "포인트모드를 선택하였습니다. 문제에 점수를 입력해주세요."
    } else if (quizMode === "cooperation") {
      return "협동모드를 선택하였습니다. 문제에 점수를 입력해주세요."
    } else {
      return "모드를 선택해주세요."
    }
  }
  const processConsolationQuestion = () => {
    const consolationQuestion = quizList.filter((item) => item.consolation)
    if (consolationQuestion.length !== 0) {
      return `${consolationQuestion.map((item) => `${item.order}번`).join(", ")} 문제를 패자부활전 문제로 선택하였습니다.`
    } else {
      return "선택된 패자부활전 문제가 없습니다."
    }
  }
  return (<Container>
    <Wrapper>
      <div className="leftContent"><FontAwesomeIcon icon={faBook} /> 선택된 퀴즈</div>
      <div className="rightContent">{quizId ? data?.detailQuiz?.title : "선택된 퀴즈가 없습니다."}</div>
    </Wrapper>
    <Wrapper>
      <div className="rightContent">{processQuizMode()}</div>
    </Wrapper>
    {quizList && <PreviewList quizList={quizList} quizMode={quizMode} setQuizList={setQuizList} setChange={setChange} />}
    {quizMode === "goldenBell" && <ConsolationQuestion>{processConsolationQuestion()}</ConsolationQuestion>}
  </Container >);
}

export default Preview;