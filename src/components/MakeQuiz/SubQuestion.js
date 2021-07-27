import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
`

const SubQuestion = ({ quizTags }) => {
  const [questionTags, setQuestionTags] = useState([])
  console.log(questionTags);
  const { register, setValue, getValues } = useForm()
  const [previewImg, setPreviewImg] = useState(undefined)
  return (<MakeQuestionForm>
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
    <Option>
      <Wrapper>
        <ImageContainer
          previewImg={previewImg}
          setPreviewImg={setPreviewImg}
          setValue={setValue}
          register={register}
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
    </Option>
  </MakeQuestionForm >);
}

export default SubQuestion;