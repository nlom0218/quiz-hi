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
import { faCircle, faEye, faEyeSlash, faQuestionCircle, faSun } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faHome, faMoon, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const Msg = styled.div``

const PasswordReset = () => {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(undefined)
  const [doneConfirm, setDoneConfirm] = useState(false)
  const [visible, setVisible] = useState(false)
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = () => { }
  return (<AccountContainer>
    <Title page="비밀번호 찾기" />
    <FormLayout>
      <PasswordEmailForm setError={setError} setDoneConfirm={setDoneConfirm} />
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
      </form>
      {error ? <ErrMsg error={error} /> : null}
    </FormLayout>
  </AccountContainer>);
}

export default PasswordReset;