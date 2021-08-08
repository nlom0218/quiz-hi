import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput from './EditInput';
import EditProfileBox from './EditProfileBox';

const EditPageForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`
const DeleteMsg = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const EditPageItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  column-gap: 20px;
  align-items: center;
`

const DelBtn = styled.input`
  text-align: center;
  background-color: tomato;
  color: #F4F4F4;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
  cursor: pointer;
`

const DeleteAccount = () => {
  const { register, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  return (<EditProfileBox>
    <EditPageForm>
      <DeleteMsg>
        <div className="delMsg">∙ 탈퇴한 계정은 다시 복구되지 않습니다.</div>
        <div className="delMsg">∙ 퀴즈, 문제, 게시물, 댓글 등 모두 삭제됩니다.</div>
      </DeleteMsg>
      <EditPageItem>
        <div>현재 비밀번호</div>
        <EditInput
          type="password"
          {...register("password", { required: true })}
          autoComplete="off"
        />
      </EditPageItem>
      <DelBtn type="submit" value="탈퇴하기" disabled={!isValid} />
    </EditPageForm>
  </EditProfileBox>);
}

export default DeleteAccount;