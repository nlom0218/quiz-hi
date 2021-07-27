import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import MakeQuestionForm from './MakeQuestionForm';
import QuestionTextarea from './QuestionTextarea';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .inputTitle {
    margin-bottom: 10px;
    font-size: 18px;
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

const SubQuestion = () => {
  const { register, watch } = useForm()
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
  </MakeQuestionForm >);
}

export default SubQuestion;