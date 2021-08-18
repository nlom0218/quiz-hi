import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from '../Edit/EditInput';

const CREATE_STUDENT_ACCOUNT_MUTATION = gql`
  mutation createStudentAccount($id: Int!, $nickname: String!, $password: String!) {
    createStudentAccount(id: $id, nickname: $nickname, password: $password) {
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
    opacity: ${props => props.maxNum ? "0.4" : "1"};
    cursor: ${props => props.maxNum ? "not-allowd" : "pointer"};
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  align-items: center;
`

const CreateStudents = ({ id }) => {
  const [studentNum, setStudentNum] = useState(["s"])
  console.log(studentNum);
  const { register, handleSubmit, formState: { isValid }, getValues } = useForm({
    mode: "onChange"
  }
  )
  let newStudentNum = null
  const onClickNumBtn = (type) => {
    if (type === "minus") {
      if (studentNum.length === 1) {
        return
      }
      newStudentNum = studentNum.splice(0, studentNum.length - 1)
    } else if (type === "plus") {
      if (studentNum.length === 50) {
        return
      }
      newStudentNum = studentNum.concat("s")
    }
    setStudentNum(newStudentNum)
  }
  return (<EditForm>
    <SetStudentNum>
      <StudentNum>학생 수: {studentNum.length}명</StudentNum>
      <SetNumBtn>
        <Btn minNum={studentNum.length === 1} onClick={() => onClickNumBtn("minus")}><FontAwesomeIcon icon={faMinus} /></Btn>
        <Btn maxNum={studentNum.length === 50} onClick={() => onClickNumBtn("plus")}><FontAwesomeIcon icon={faPlus} /></Btn>
      </SetNumBtn>
      {studentNum.length === 50 && <div className="setNumMsg">생성가능한 최대 학생 계정수은 50입니다.</div>}
    </SetStudentNum>
    {studentNum.map((item, index) => {
      return <Wrapper key={index}>
        <div>{index + 1}번 학생이름(닉네임)</div>
        <EditInput
          {...register("nickname", { required: true })}
          type="text"
          autoComplete="off"
        />
      </Wrapper>
    })}
  </EditForm>);
}

export default CreateStudents;