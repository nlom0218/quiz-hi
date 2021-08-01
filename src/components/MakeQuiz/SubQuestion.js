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
      $state: String!
      $hint: String,
      $image: Upload,
      $tags: String,
      $distractor: String
      ) {
      createQuestion(
        question: $question,
        answer: $answer,
        type: $type,
        state: $state
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

const SubQuestion = ({ quizTags, quizType, setQuestionIdArr, questionIdArr, setNextMode, nextMode, imageId, state }) => {
  const [questionTags, setQuestionTags] = useState([])
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
        state,
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
        nextMode={nextMode} />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">・ 정답</span>
      <input
        {...register("answer", {
          required: true
        })}
        type="text"
        autoComplete="off"
        readOnly={nextMode !== "" && "readOnly"}
      />
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
      <InputBtn value={loading ? "문제 만드는 중..." : "문제 만들기"} disabled={!isValid} bgColor="rgb(172, 255, 20)" />
      :
      <NextStep
        setNextMode={setNextMode}
        nextMode={nextMode}
      />
    }
  </MakeQuestionForm >);
}

export default SubQuestion;