import React, { useState } from 'react';
import AccountContainer from '../components/Account/AccountContainer';
import Title from '../components/Account/Title';
import FormLayout from '../components/Account/FormLayout';
import styled from 'styled-components';
import ErrMsg from '../components/Account/ErrMsg';
import { useForm } from 'react-hook-form';
import PasswordEmailForm from '../components/Account/PasswordEmailForm';
import InputLayout from '../components/Account/InputLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import InputBtn from '../components/InputBtn';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import ConfirmUsername from '../components/Account/ConfirmUsername';

const RESET_PASSWORD_MUTATION = gql`
mutation resetPassword($email: String!, $newPassword: String!, $newPasswordConfirm: String!) {
  resetPassword(email: $email, newPassword: $newPassword, newPasswordConfirm: $newPasswordConfirm) {
      ok
      error
    }
  }
`

const PasswordReset = () => {
  const history = useHistory()
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const [error, setError] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [doneConfirm, setDoneConfirm] = useState(false)
  const onCompleted = (result) => {
    const { resetPassword: { ok, error } } = result
    if (error) {
      setError(error)
    }
    if (ok) {
      history.push("/login")
    }
  }
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted
  })
  const [visible, setVisible] = useState(false)
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = (data) => {
    const { password, passwordConfirm } = data
    if (loading) {
      return
    }
    resetPassword({
      variables: {
        email,
        newPassword: password,
        newPasswordConfirm: passwordConfirm
      }
    })
  }
  return (<AccountContainer>
    <Title page="아이디/비밀번호 찾기" />
    <FormLayout>
      <PasswordEmailForm setError={setError} setDoneConfirm={setDoneConfirm} setEmail={setEmail} />
      {doneConfirm && <ConfirmUsername email={email} />}
      <form className="loginCreateAccountForm" onSubmit={handleSubmit(onSubmit)}>
        <InputLayout>
          <span>
            새 비밀번호
            <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
          </span>
          <input type={visible ? "text" : "password"} {...register("password", { required: true })} autoComplete="off" />
        </InputLayout>
        <InputLayout>
          <span>
            새 비밀번호 확인
            </span>
          <input type={visible ? "text" : "password"} {...register("passwordConfirm", { required: true })} autoComplete="off" />
        </InputLayout>
        <InputBtn value="비밀번호 변경하기" disabled={!isValid || !doneConfirm} bgColor="rgb(67, 216, 122)" />
      </form>
      {error ? <ErrMsg error={error} /> : null}
    </FormLayout>
  </AccountContainer>);
}

export default PasswordReset;