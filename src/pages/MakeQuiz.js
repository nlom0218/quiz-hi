import React, { useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import MakeQuizForm from '../components/MakeQuiz/MakeQuizForm';
import QuizFormLayout from '../components/MakeQuiz/QuizFormLayout';
import Step from '../components/MakeQuiz/Step';
import PageTitle from '../components/PageTitle';

const MakeQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("")
  const [quizTags, setQuizTags] = useState([])
  const [makeQuestion, setMakeQuestion] = useState(false)
  console.log(quizTitle);
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <PageTitle title="퀴즈 만들기" />
      <Step step={1} msg="퀴즈의 제목과 태그를 입력해주세요." >
        <QuizFormLayout bgColor="rgb(255, 180, 68, 0.2)">
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
    </BasicContainer>
  </React.Fragment>);
}

export default MakeQuiz;