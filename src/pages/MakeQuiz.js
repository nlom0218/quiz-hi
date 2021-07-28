import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import MakeQuestionContainer from '../components/MakeQuiz/MakeQuestionContainer';
import MakeQuizForm from '../components/MakeQuiz/MakeQuizForm';
import QuizFormLayout from '../components/MakeQuiz/QuizFormLayout';
import Step from '../components/MakeQuiz/Step';
import PageTitle from '../components/PageTitle';
import NavBtn from '../components/NavBtn';

const MakeQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizTags, setQuizTags] = useState([])
  const [questionIdArr, setQuestionIdArr] = useState([])
  const [makeQuestion, setMakeQuestion] = useState(false)
  const [questionNum, setQuestionNum] = useState(["q"])
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle title="퀴즈 만들기" />
      <Step step={1} msg="퀴즈의 제목과 태그를 입력하세요.">
        <QuizFormLayout bgColor="rgb(180, 255, 158, 0.2)">
          <MakeQuizForm
            quizTags={quizTags}
            setQuizTags={setQuizTags}
            setQuizTitle={setQuizTitle}
            setMakeQuestion={setMakeQuestion}
            makeQuestion={makeQuestion}
            quizTitle={quizTitle}
          />
        </QuizFormLayout>
      </Step>
      {makeQuestion &&
        questionNum.map((item, index) => {
          return <Step
            step={2}
            msg="문제의 유형을 선택한 후 문제와 정답을 입력하세요."
            key={index}
          >
            <QuizFormLayout bgColor="rgb(231, 255, 188, 0.2)">
              <MakeQuestionContainer
                num={index + 1}
                questionNum={questionNum}
                setQuestionNum={setQuestionNum}
                quizTags={quizTags}
                setQuestionIdArr={setQuestionIdArr}
                questionIdArr={questionIdArr}
                imageId={`${index}image`}
              />
            </QuizFormLayout>
          </Step>
        })
      }
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default MakeQuiz;