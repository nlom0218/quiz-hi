import { useMutation } from '@apollo/client';
import { faEye, faEyeSlash, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from '../Edit/EditInput';
import SaveBtn from '../Edit/SaveBtn';

const SStudentEditting = styled.form`
  margin: 20px 0px;
  padding: 0px 40px;
  justify-self: stretch;
  grid-column: 1 / -1;
  animation: ${fadeIn} 0.6s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: center;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`

const Button = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 40px;
`

const DelBtn = styled.div`
  align-self: center;
  text-align: center;
  background-color: tomato;
  color: #F4F4F4;
  padding: 10px 40px;
  border-radius: 5px;
  transition: opacity 0.4s linear;
  cursor: pointer;
  svg {
    margin-left: 20px;
  }
`

const EDIT_STUDENT_PROFILE_MUTATION = gql`
  mutation editStudentProfile($teacherId: Int!, $studentId: Int!, $password: String, $nickname: String) {
    editStudentProfile(teacherId: $teacherId, studentId: $studentId, password: $password, nickname: $nickname) {
      ok
      error
    }
  }
`

const StudentEditting = ({ nickname, teacherId, studentId }) => {
  const [visible, setVisible] = useState(false)
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname
    }
  })
  const [editStudentProfile, { loading }] = useMutation(EDIT_STUDENT_PROFILE_MUTATION)
  const onSubmit = (data) => {
    const { nickname, password } = data
    if (loading) {
      return
    }
    editStudentProfile({
      variables: {
        teacherId,
        studentId,
        nickname,
        ...(password !== "" && { password })
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
  return (<SStudentEditting onSubmit={handleSubmit(onSubmit)}>
    <Wrapper>
      <div>닉네임</div>
      <EditInput
        {...register("nickname", { required: true })}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
    <Wrapper>
      <div>비밀번호 재설정
      <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
      </div>
      <EditInput
        {...register("password")}
        type={visible ? "text" : "password"}
        autoComplete="off"
      />
    </Wrapper>
    <Button>
      <SaveBtn type="submit" value="저장하기" disabled={!isValid} />
      <DelBtn>계정 삭제하기</DelBtn>
    </Button>
  </SStudentEditting>);
}

export default StudentEditting;