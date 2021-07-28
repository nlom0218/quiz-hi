import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputBtn from '../InputBtn';
import InputLayout from './InputLayout';
import MakeQuestionForm from './MakeQuestionForm';
import NextStep from './NextStep';
import QuestionOption from './QuestionOption';
import QuestionOptionTitle from './QuestionOptionTitle';
import QuestionTextarea from './QuestionTextarea';

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

const SubQuestion = ({ quizTags, quizType, setQuestionIdArr, questionIdArr, setMadeQuestion, madeQuestion, setNextMode }) => {
  const [questionTags, setQuestionTags] = useState([])
  const [image, setImage] = useState(undefined)
  const [option, setOption] = useState(false)
  const { register, setValue, getValues, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const [previewImg, setPreviewImg] = useState(undefined)
  const onCompleted = (result) => {
    const { createQuestion: { questionId, ok } } = result
    if (ok) {
      const newQuestionIdArr = [...questionIdArr, questionId]
      setQuestionIdArr(newQuestionIdArr)
      setMadeQuestion(true)
    }
  }
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    const { answer, question, hint } = data
    const type = quizType
    const tags = [...quizTags, ...questionTags].join(",")
    if (loading) {
      return
    }
    createQuestion({
      variables: {
        question,
        answer,
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
      <QuestionTextarea register={register} madeQuestion={madeQuestion} />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">・ 정답</span>
      <input
        {...register("answer", {
          required: true
        })}
        type="text"
        autoComplete="off"
        readOnly={madeQuestion && "readOnly"}
      />
    </InputLayout>
    <QuestionOptionTitle option={option} setOption={setOption} />
    {option && <QuestionOption
      register={register}
      getValues={getValues}
      setValue={setValue}
      questionTags={questionTags}
      setQuestionTags={setQuestionTags}
      previewImg={previewImg}
      setPreviewImg={setPreviewImg}
      setImage={setImage}
      madeQuestion={madeQuestion}
    />}
    {!madeQuestion ?
      <InputBtn value="문제 생성하기" disabled={!isValid} bgColor="rgb(249, 192, 134)" />
      :
      <NextStep setNextMode={setNextMode} />
    }
  </MakeQuestionForm >);
}

export default SubQuestion;