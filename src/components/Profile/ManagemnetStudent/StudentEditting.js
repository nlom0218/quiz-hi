import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from '../Edit/EditInput';

const SStudentEditting = styled.form`
  padding: 0px 40px;
  justify-self: stretch;
  grid-column: 1 / -1;
  animation: ${fadeIn} 0.6s ease;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
`

const StudentEditting = ({ nickname }) => {
  const { register } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname
    }
  })
  return (<SStudentEditting>
    <Wrapper>
      <div>닉네임</div>
      <EditInput
        {...register("nickname", { required: true })}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
    <Wrapper>
      <div>비밀번호 재설정</div>
      <EditInput
        {...register("password")}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
  </SStudentEditting>);
}

export default StudentEditting;