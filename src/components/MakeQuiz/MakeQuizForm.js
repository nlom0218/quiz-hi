import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import InputBtn from '../InputBtn';
import InputLayout from './InputLayout';
import TagContainer from './TagContainer';

const SMakeQuizForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
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

const SeletBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`

const StateBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(200, 200, 200, 0.6);
    opacity: ${props => props.opacity};
    font-size: 16px;
    padding: 10px 0px;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity 0.2s linear;
`

const MakeQuizForm = (
  { setQuizTags, quizTags, setQuizTitle, quizTitle, makeQuestion, setMakeQuestion, state, setState }) => {
  const user = useUser()
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
  const onClickStateBtn = (state) => {
    if (makeQuestion || user.type === "nomal") {
      return
    }
    setState(state)
  }
  return (<SMakeQuizForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout>
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
    </InputLayout>
    <InputLayout>
      <TagContainer
        getValues={getValues}
        setValue={setValue}
        register={register}
        tags={quizTags}
        setTags={setQuizTags}
        makeQuestion={makeQuestion}
        color="rgb(108, 255, 63)"
        bgColor="rgb(108, 255, 63, 0.5)"
        subMsg1="퀴즈와 모든 문제에 동일한 태그를 부여합니다. 태그를 입력하고 + 버튼을 눌러주세요."
      />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">・ 공유하시겠습니까?</span>
      <SeletBox>
        <StateBtn
          onClick={() => onClickStateBtn("public")}
          opacity={state === "public" ? "1" : "0.4"}
        >공유하기</StateBtn>
        <StateBtn
          onClick={() => onClickStateBtn("private")}
          opacity={state === "private" ? "1" : "0.4"}
        >공유하지 않기</StateBtn>
      </SeletBox>
    </InputLayout>
    <InputBtn value="2단계 진행하기" disabled={!isValid || makeQuestion || state === ""} />
  </SMakeQuizForm>);
}

export default MakeQuizForm;