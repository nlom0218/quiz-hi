import { useMutation } from '@apollo/client';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import InputBtn from '../InputBtn';
import ImageContainer from './ImageContainer';
import MakeQuestionForm from './MakeQuestionForm';
import QuestionTextarea from './QuestionTextarea';
import TagContainer from './TagContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .inputTitle {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .subMsg {
    margin-bottom: 5px;
  }
  input {
    background-color: rgb(247, 171, 96, 0.2);
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.2s linear;
    :focus {
      background-color: rgb(247, 171, 96, 0.4);
    }
  }
`

const Option = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  animation: ${fadeIn} 1s linear forwards;
  .hint {
    grid-column: 1 / -1;
  }
`

const OptionTitle = styled.div`
  grid-column: 1 / -1;
  font-size: 18px;
  margin-bottom: 20px;
  svg {
    margin-left: 10px;
    font-size: 24px;
    cursor: pointer;
  }
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
      error
      token
    }
  }
`

const SubQuestion = ({ quizTags, quizType }) => {
  const user = useUser()
  const [questionTags, setQuestionTags] = useState([])
  const [image, setImage] = useState(undefined)
  const [option, setOption] = useState(false)
  const { register, setValue, getValues, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const [previewImg, setPreviewImg] = useState(undefined)
  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION_MUTATION, {

  })
  const onClickOption = () => {
    setOption(!option)
  }
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
        ...(tags && { tags })
      }
    })
  }
  return (<MakeQuestionForm onSubmit={handleSubmit(onSubmit)}>
    <Wrapper>
      <span className="inputTitle">・ 문제</span>
      <QuestionTextarea register={register} />
    </Wrapper>
    <Wrapper>
      <span className="inputTitle">・ 정답</span>
      <input
        {...register("answer", {
          required: true
        })}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
    <OptionTitle>
      <span>옵션</span>
      <FontAwesomeIcon icon={option ? faCaretUp : faCaretDown} onClick={onClickOption} />
    </OptionTitle>
    {option && <Option>
      <Wrapper className="hint">
        <span className="inputTitle">・ 힌트</span>
        <span className="subMsg">힌트가 있나요?</span>
        <span className="subMsg">아래에 힌트를 작성하세요.</span>
        <input
          {...register("hint")}
          type="text"
        />
      </Wrapper>
      <Wrapper>
        <ImageContainer
          previewImg={previewImg}
          setPreviewImg={setPreviewImg}
          setValue={setValue}
          register={register}
          setImage={setImage}
        />
      </Wrapper>
      <Wrapper>
        <TagContainer
          getValues={getValues}
          setValue={setValue}
          register={register}
          tags={questionTags}
          setTags={setQuestionTags}
          subMsg1="해당 문제에만 해당되는 태그가 있나요?"
          subMsg2="태그를 입력하고 + 버튼을 눌러주세요."
        />
      </Wrapper>
    </Option>}
    <InputBtn value="문제 생성하기" disabled={!isValid} bgColor="rgb(249, 192, 134)" />
  </MakeQuestionForm >);
}

export default SubQuestion;