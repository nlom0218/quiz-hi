import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import InputBtn from '../InputBtn';
import InputLayout from './InputLayout';
import QuestionTextarea from './QuestionTextarea';
import TagContainer from './TagContainer';

const SMakeQuizForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 60px;
`

const ChangeMsg = styled.div`
  grid-column: 2 / 3;
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
  { setQuizTags, quizTags, setQuizTitle, quizTitle, makeQuestion, setMakeQuestion, state, setState, setQuizCaption, quizCaption }) => {
  const user = useUser()
  const { register, getValues, setValue, formState: { isValid }, handleSubmit, watch } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    setQuizTitle(data.quizTitle)
    setQuizCaption(data.question)
    setMakeQuestion(true)
  }
  const onClickChangeBtn = (value) => {
    if (value === "title") {
      setQuizTitle(getValues("quizTitle"))
    } else if (value === "caption") {
      setQuizCaption(getValues("question"))
    }
  }
  const onClickStateBtn = (state) => {
    if (makeQuestion || user.type === "nomal") {
      return
    }
    setState(state)
  }
  return (<SMakeQuizForm onSubmit={handleSubmit(onSubmit)}>
    <InputLayout>
      <span className="inputTitle">?????? ??????</span>
      <input
        {...register("quizTitle", {
          required: true
        })}
        type="text"
        autoComplete="off"
      />
      {makeQuestion && <React.Fragment>
        {quizTitle !== watch("quizTitle") && <ChangeMsg>
          <span>??????????????? ????????????. ?????????????????????????</span>
          <ChangeBtn onClick={() => onClickChangeBtn("title")}>????????????</ChangeBtn>
        </ChangeMsg>}
      </React.Fragment>}
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">?????? ??????</span>
      {/* <span className="subMsg">????????? ?????? ????????? ???????????????.</span> */}
      <QuestionTextarea
        register={register} nextMode="" />
      {makeQuestion && <React.Fragment>
        {quizCaption !== watch("question") && <ChangeMsg>
          <span>??????????????? ????????????. ?????????????????????????</span>
          <ChangeBtn onClick={() => onClickChangeBtn("caption")}>????????????</ChangeBtn>
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
        subMsg1="????????? ?????? ????????? ????????? ????????? ???????????????. ????????? ???????????? + ????????? ???????????????."
      />
    </InputLayout>
    <InputLayout>
      <span className="inputTitle">??????</span>
      <SeletBox>
        <StateBtn
          onClick={() => onClickStateBtn("public")}
          opacity={state === "public" ? "1" : "0.4"}
        >????????????</StateBtn>
        <StateBtn
          onClick={() => onClickStateBtn("private")}
          opacity={state === "private" ? "1" : "0.4"}
        >???????????? ??????</StateBtn>
      </SeletBox>
    </InputLayout>
    <InputBtn value="2?????? ????????????" disabled={!isValid || makeQuestion || state === ""} />
  </SMakeQuizForm>);
}

export default MakeQuizForm;