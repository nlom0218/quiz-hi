import { useMutation } from '@apollo/client';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from '../Edit/EditInput';
import SaveBtn from '../Edit/SaveBtn';

const CREATE_STUDENT_ACCOUNT_MUTATION = gql`
  mutation createStudentAccount($id: Int!, $nickname: String!, $password: String!, $username: String) {
    createStudentAccount(id: $id, nickname: $nickname, password: $password, username: $username) {
      ok
      error
    }
  }
`

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const SetStudentNum = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 4fr;
  column-gap: 30px;
  align-items: center;
  .setNumMsg {
    animation: ${fadeIn} 0.6s ease;
    color: tomato;
  }
`

const StudentNum = styled.div`
`

const SetNumBtn = styled.div`
  justify-self: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
`

const Btn = styled.div`
  cursor: pointer;
  padding: 5px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.minNum ? "0.4" : "1"};
    cursor: ${props => props.minNum ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
  }
`

const StudentNameList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  align-items: center;
`

const SetPassword = styled.div`
  /* grid-column: 1 / -1; */
  display: grid;
  grid-template-columns: 100px 1fr;
  column-gap: 30px;
  row-gap: 20px;
  align-items: center;
  input {
    justify-self: flex-start;
  }
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`

const SetPasswordMsg = styled.div`
  grid-column: 1 / -1;
  line-height: 24px;
  opacity: 0.8;
  span {
    color: tomato;
    font-weight: 800;
  }
`

const ErrMsg = styled.div`
  grid-column: 1 / -1;
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const CreateStudents = ({ id, addAccount, students }) => {
  const [studentNum, setStudentNum] = useState(["s"])
  const [visible, setVisible] = useState(true)
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, handleSubmit, formState: { isValid }, getValues } = useForm({
    mode: "onChange"
  }
  )
  const onCompleted = (result) => {
    const { createStudentAccount: { ok, error } } = result
    if (ok) {
      window.location.reload()
    }
    if (!ok) {
      setErrMsg(error)
    }
  }
  const [createStudentAccount, { loading }] = useMutation(CREATE_STUDENT_ACCOUNT_MUTATION, {
    onCompleted
  })
  const onClickNumBtn = (type) => {
    let newStudentNum = null
    if (type === "minus") {
      if (studentNum.length === 1) {
        return
      }
      newStudentNum = studentNum.splice(0, studentNum.length - 1)
    } else if (type === "plus") {
      newStudentNum = studentNum.concat("s")
    }
    setStudentNum(newStudentNum)
  }
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { password } = data
    const nicknameArr = Object.keys(data).map((item) => {
      if (item === "password") {
        return
      }
      if (item === "username") {
        return
      }
      return data[item]
    }).filter((item) => item !== undefined)
    const nickname = nicknameArr.join(",")
    createStudentAccount({
      variables: {
        id,
        nickname,
        password,
      }
    })
  }
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  return (<EditForm onSubmit={handleSubmit(onSubmit)}>
    <SetStudentNum>
      <StudentNum>?????? ???: {studentNum.length}???</StudentNum>
      <SetNumBtn>
        <Btn minNum={studentNum.length === 1} onClick={() => onClickNumBtn("minus")}><FontAwesomeIcon icon={faMinus} /></Btn>
        <Btn onClick={() => onClickNumBtn("plus")}><FontAwesomeIcon icon={faPlus} /></Btn>
      </SetNumBtn>
    </SetStudentNum>
    <StudentNameList>
      {studentNum.map((item, index) => {
        return <Wrapper key={index}>
          <div>{index + 1}???</div>
          <EditInput
            {...register(`nickname${index + 1}`, { required: true })}
            type="text"
            autoComplete="off"
            placeholder={`${index + 1}??? ????????? ??????(?????????) ??????`}
          />
        </Wrapper>
      })}
    </StudentNameList>
    <StudentNameList>
      <SetPassword>
        <div>????????????
      <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
        </div>
        <EditInput
          {...register("password", { required: true })}
          type={visible ? "text" : "password"}
          autoComplete="off"
        />
      </SetPassword>
    </StudentNameList>
    <SetPasswordMsg>
      "?????? ???????????? <span>????????? ?????????_s????????????</span>?????? ??????????????? <span> ????????? ????????????^^????????????</span>?????????.
      ???????????? ??????????????? ????????? ???????????? ????????? ?????? ???????????? ???????????? ????????? ???????????????."
    </SetPasswordMsg>
    <SaveBtn type="submit" value="?????? ?????? ????????????" disabled={!isValid} />
    <ErrMsg>{errMsg}</ErrMsg>
  </EditForm>);
}

export default CreateStudents;