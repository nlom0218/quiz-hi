import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import InputBtn from '../Account/InputBtn';
import TagContainer from './TagContainer';

const SMakeQuizForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`

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
    background-color: rgb(255, 185, 94, 0.2);
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.2s linear;
    :focus {
      background-color: rgb(255, 185, 94, 0.6);
    }
  }
`

const ChangeMsg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: tomato;
  animation: ${fadeIn} 0.6s linear forwards;
`

const ChangeBtn = styled.div`
  margin-left: 10px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`

const MakeQuizForm = ({ setQuizTags, quizTags, setQuizTitle, quizTitle, makeQuestion, setMakeQuestion }) => {
  const { register, getValues, setValue, formState: { isValid }, handleSubmit, watch } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    setQuizTitle(data.quizTitle)
    setMakeQuestion(true)
  }
  const onClickChangeBtn = () => {
    setQuizTitle(getValues("quizTitle"))
  }
  return (<SMakeQuizForm onSubmit={handleSubmit(onSubmit)}>
    <Wrapper>
      <span className="inputTitle">・ 퀴즈 제목</span>
      <input
        {...register("quizTitle", {
          required: true
        })}
        type="text"
        autoComplete="off"
      />
      {makeQuestion && <React.Fragment>
        {quizTitle !== watch("quizTitle") && <ChangeMsg>
          <span>변경사항이 있습니다. 수정하시겠습니까?</span>
          <ChangeBtn onClick={onClickChangeBtn}>수정하기</ChangeBtn>
        </ChangeMsg>}
      </React.Fragment>}
    </Wrapper>
    <Wrapper>
      <TagContainer
        getValues={getValues}
        setValue={setValue}
        register={register}
        tags={quizTags}
        setTags={setQuizTags}
      />
    </Wrapper>
    <InputBtn value="2단계 진행하기" bgColor="rgb(255, 185, 94)" disabled={!isValid || makeQuestion} />
  </SMakeQuizForm>);
}

export default MakeQuizForm;