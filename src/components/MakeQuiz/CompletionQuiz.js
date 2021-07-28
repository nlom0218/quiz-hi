import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import InputBtn from '../InputBtn';
import LinkBtn from '../LinkBtn';
import NavBtn from '../NavBtn';
import InputLayout from './InputLayout';

const SCompletionQuizForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  animation: ${fadeIn} 0.8s linear forwards;
`

const SeeTag = styled.div`
  margin-top: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color:  ${props => props.bgColor};
  margin-bottom: 10px;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.6s linear forwards;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`

const MovePageBtn = styled.div`
  animation: ${fadeIn} 0.6s linear forwards;
  margin-top: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 30px;
`

const CompleteMsg = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`

const CREATE_QUIZ_MUTATION = gql`
  mutation createQuiz(      
      $questions: String!,
      $title: String!,
      $state: String!
      $tags: String,
      ) {
        createQuiz(
        questions: $questions,
        title: $title,
        state: $state
        tags: $tags,
      ) {
      ok
      error
    }
  }
`

const CompletionQuiz = ({ quizTags, quizTitle, state, questionIdArr }) => {
  const num = questionIdArr.length
  const [complete, setComplete] = useState(false)
  const onCompleted = (result) => {
    const { createQuiz: { ok, error } } = result
    if (ok) {
      setComplete(true)
    }
  }
  const [createQuiz, { loading }] = useMutation(CREATE_QUIZ_MUTATION, {
    onCompleted
  })
  const { handleSubmit } = useForm()
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const questionString = questionIdArr.join(",")
    const tags = [...quizTags].join(",")
    createQuiz({
      variables: {
        title: quizTitle,
        state,
        tags,
        questions: questionString
      }
    })
  }
  return (<SCompletionQuizForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout bgColor="rgb(108, 255, 63, 0.5)">
      <span className="inputTitle">・ 퀴즈 제목</span>
      <input
        value={quizTitle}
        type="text"
        readOnly="readOnly"
      />
    </InputLayout>
    <Wrapper>
      <InputLayout bgColor="rgb(108, 255, 63, 0.5)">
        <span className="inputTitle">・ 공유</span>
        <input
          value={state === "private" ? "공유하지 않음" : "공유함"}
          type="text"
          readOnly="readOnly"
        />
      </InputLayout>
      <InputLayout bgColor="rgb(108, 255, 63, 0.5)">
        <span className="inputTitle">・ 문제 개수</span>
        <input
          value={`${num}개`}
          type="text"
          readOnly="readOnly"
        />
      </InputLayout>
    </Wrapper>
    <InputLayout>
      <span className="inputTitle">・ 태그</span>
      <span className="subMsg">
        <SeeTag>
          {quizTags.map((item, index) => {
            return <TagBox key={index} bgColor="rgb(108, 255, 63, 0.5)">
              {item}
            </TagBox>
          })}
        </SeeTag>
      </span>
    </InputLayout>
    {complete ?
      <React.Fragment>
        <CompleteMsg className="inputTitle">퀴즈가 생성 되었습니다.</CompleteMsg>
        <MovePageBtn>
          <LinkBtn route="make-quiz" text="새로 만들기" onClick={() => window.reload()} />
          <LinkBtn route="quiz-feed" text="퀴즈 피드" />
          <LinkBtn route="paly-quiz" text="퀴즈 진행하기" />
          <LinkBtn route="me" text="퀴즈 확인하기" />
        </MovePageBtn>
      </React.Fragment>
      :
      <InputBtn
        disabled={false}
        value={loading ? "퀴즈 만드는 중..." : "퀴즈 만들기"}
        bgColor="rgb(108, 255, 63)"
      />}
  </SCompletionQuizForm>);
}

export default CompletionQuiz;