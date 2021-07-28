import { useMutation } from '@apollo/client';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import InputBtn from '../InputBtn';
import InputLayout from './InputLayout';
import MakeQuestionForm from './MakeQuestionForm';
import NextStep from './NextStep';
import QuestionOption from './QuestionOption';
import QuestionOptionTitle from './QuestionOptionTitle';
import QuestionTextarea from './QuestionTextarea';

const DistractorBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 1fr);
  row-gap: 20px;
  .distractorWrapper {
    display: grid;
    grid-template-columns: 1fr 12fr 1fr;
    svg {
    justify-self: center;
    align-self: center;
    font-size: 18px;
    cursor: pointer;
    }
  }
`

const DistractorNum = styled.div`
  justify-self: center;
  align-self: center;
`

const CREATE_QUESTION_MUTATION = gql`
  mutation createQuestion(      
      $question: String!,
      $answer: String!,
      $type: String!,
      $hint: String,
      $image: Upload,
      $tags: String,
      $distractor: String
      ) {
      createQuestion(
        question: $question,
        answer: $answer,
        type: $type,
        hint: $hint,
        image: $image,
        tags: $tags,
        distractor: $distractor
      ) {
      ok
      questionId
      error
    }
  }
`

const SubQuestion = ({ quizTags, quizType, setQuestionIdArr, questionIdArr, setNextMode, nextMode, imageId }) => {
  const [questionTags, setQuestionTags] = useState([])
  const [answer, setAnswer] = useState([])
  console.log(answer);
  const [image, setImage] = useState(undefined)
  const [option, setOption] = useState(false)
  const [previewImg, setPreviewImg] = useState(undefined)
  const { register, setValue, getValues, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { createQuestion: { questionId, ok } } = result
    if (ok) {
      const newQuestionIdArr = [...questionIdArr, questionId]
      setQuestionIdArr(newQuestionIdArr)
      setNextMode("next")
    }
  }
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION_MUTATION, {
    onCompleted
  })
  const onClickAnswer = (num) => {
    if (nextMode !== "") {
      return
    }
    const ok = answer.includes(num)
    if (ok) {
      const newAnswer = answer.filter((item) => item !== num)
      setAnswer(newAnswer)
    } else {
      const newAnswer = [...answer, num]
      setAnswer(newAnswer)
    }
  }
  const checkAnswer = (num) => {
    const ok = answer.includes(num)
    if (ok) {
      return true
    } else {
      return false
    }
  }
  const onSubmit = (data) => {
    const { question, hint, distractor1, distractor2, distractor3, distractor4 } = data
    const type = quizType
    const tags = [...quizTags, ...questionTags].join(",")
    const answerString = answer.join(",")
    const distractor = `${distractor1}//!@#${distractor2}//!@#${distractor3}//!@#${distractor4}`
    createQuestion({
      variables: {
        question,
        answer: answerString,
        distractor,
        type,
        ...(hint && { hint }),
        ...(image && { image }),
        ...(tags && { tags }),
      }
    })
  }
  return (<MakeQuestionForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout>
      <span className="inputTitle">・ 문제</span>
      <QuestionTextarea
        register={register}
        nextMode={nextMode}
        bgColor="rgb(172, 255, 20, 0.2)"
        fcBgColor="rgb(172, 255, 20, 0.4)" />
    </InputLayout>
    <InputLayout bgColor="rgb(172, 255, 20, 0.2)" fcBgColor="rgb(172, 255, 20, 0.4)">
      <span className="inputTitle">・ 선택지</span>
      <span className="subMsg">문항을 입력하고 정답을 체크해주세요.(중복가능)</span>
      <DistractorBox>
        {[1, 2, 3, 4].map((item) => {
          return <div className="distractorWrapper" key={item}>
            <DistractorNum>{item}번</DistractorNum>
            <input
              {...register(`distractor${item}`, {
                required: true
              })}
              type="text"
              autoComplete="off"
              readOnly={nextMode !== "" && "readOnly"}
            />
            <FontAwesomeIcon
              onClick={() => onClickAnswer(item)}
              icon={checkAnswer(item) ? faCheckCircle : faCircle}
            />
          </div>
        })}
      </DistractorBox>
    </InputLayout>
    <QuestionOptionTitle option={option} setOption={setOption} />
    {option && <QuestionOption
      register={register}
      getValues={getValues}
      setValue={setValue}
      questionTags={questionTags}
      setQuestionTags={setQuestionTags}
      setImage={setImage}
      nextMode={nextMode}
      imageId={imageId}
      previewImg={previewImg}
      setPreviewImg={setPreviewImg}
    />}
    {nextMode === "" ?
      <InputBtn
        value={loading ? "문제 만드는 중..." : "문제 만들기"}
        disabled={!isValid || answer.length === 0}
        bgColor="rgb(172, 255, 20)" />
      :
      <NextStep
        setNextMode={setNextMode}
        nextMode={nextMode}
        bgColor="rgb(172, 255, 20, 0.2)"
        hvBgColor="rgb(172, 255, 20, 0.6)"
      />
    }
  </MakeQuestionForm>);
}

export default SubQuestion;