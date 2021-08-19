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
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 30px;
  row-gap: 20px;
  align-items: center;
  input {
    justify-self: flex-start;
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

const CreateStudents = ({ id }) => {
  const [studentNum, setStudentNum] = useState(["s"])
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
  const onSubmit = (data) => {
    console.log(data);
    console.log([data.nickname1, data.nickname2]);
  }
  return (<EditForm onSubmit={handleSubmit(onSubmit)}>
    <SetStudentNum>
      <StudentNum>학생 수: {studentNum.length}명</StudentNum>
      <SetNumBtn>
        <Btn minNum={studentNum.length === 1} onClick={() => onClickNumBtn("minus")}><FontAwesomeIcon icon={faMinus} /></Btn>
        <Btn maxNum={studentNum.length === 50} onClick={() => onClickNumBtn("plus")}><FontAwesomeIcon icon={faPlus} /></Btn>
      </SetNumBtn>
      {studentNum.length === 50 && <div className="setNumMsg">생성가능한 최대 학생 계정수은 50입니다.</div>}
    </SetStudentNum>
    <StudentNameList>
      {studentNum.map((item, index) => {
        return <Wrapper key={index}>
          <div>{index + 1}번</div>
          <EditInput
            {...register(`nickname${index + 1}`, { required: true })}
            type="text"
            autoComplete="off"
            placeholder={`${index + 1}번 학생의 이름(닉네임) 입력`}
          />
        </Wrapper>
      })}
    </StudentNameList>
    <SetPassword>
      <div>비밀번호</div>
      <EditInput
        {...register("password", { required: true })}
        type="password"
        autoComplete="off"
      />
      <SetPasswordMsg>"학생 아이디는 선생님 <span>아이디_s학생번호</span>이며 비밀번호는 입력한 <span>비밀번호^^학생번호</span>입니다.
        학생들의 비밀번호는 동일한 패턴이기 때문에 계정 생성이후 비밀번호 변경을 권합니다."
      </SetPasswordMsg>
    </SetPassword>
    <SaveBtn type="submit" value="학생 계정 생성하기" disabled={!isValid} />
  </EditForm>);
}

export default CreateStudents;