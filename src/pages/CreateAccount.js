import { useMutation, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import { faCircle, faEye, faEyeSlash, faQuestionCircle, faSun } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faHome, faMoon, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar } from '../apollo';
import AccountContainer from '../components/Account/AccountContainer';
import EmailForm from '../components/Account/EmailForm';
import ErrMsg from '../components/Account/ErrMsg';
import FormLayout from '../components/Account/FormLayout';
import InputBtn from '../components/Account/InputBtn';
import InputLayout from '../components/Account/InputLayout';
import PageBar from '../components/Account/PageBar';
import PageBarItem from '../components/Account/PageBarItem';
import Title from '../components/Account/Title';
import { onCLickDarkMode } from '../sharedFn';

const SelectType = styled.div`
  margin-bottom: 20px;
  .selectBox {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    svg {
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($type: String!, $email: String, $username: String!, $password: String! $passwordConfirm: String!) {
    createAccount(type: $type, email: $email, username: $username, password: $password, passwordConfirm: $passwordConfirm) {
      ok
      error
    }
  }
`

const CreateAccount = () => {
  const history = useHistory()
  const [doneConfirm, setDoneConfirm] = useState(false)
  const [error, setError] = useState(undefined)
  const [email, setEmail] = useState(undefined)
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    const { createAccount: { ok, error } } = result
    if (error) {
      setError(error)
      setTimeout(() => {
        setError(undefined)
      }, 4000)
    }
    if (ok) {
      history.push("/login")
    }
  }
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted
  })
  const darkMode = useReactiveVar(darkModeVar)
  const [type, setType] = useState("teacher")
  const onClinkType = (type) => {
    if (type === "teacher") {
      setType("teacher")
      setDoneConfirm(false)
    } else if (type === "nomal") {
      setType("nomal")
      setDoneConfirm(true)
    }
  }
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = (data) => {
    const { username, password, passwordConfirm } = data
    if (loading) {
      return
    }
    createAccount({
      variables: {
        username,
        type,
        password,
        passwordConfirm,
        ...(email && { email })
      }
    })
  }
  return (
    <AccountContainer>
      <Title page="회원가입" />
      <FormLayout>
        <SelectType>
          <div className="title">가입 유형</div>
          <div className="selectBox">
            <div className="selectItem">
              <FontAwesomeIcon icon={type === "teacher" ? faCheckCircle : faCircle} onClick={() => onClinkType("teacher")} />
              <span className="typeName">선생님</span>
            </div>
            <div className="selectItem">
              <FontAwesomeIcon icon={type === "nomal" ? faCheckCircle : faCircle} onClick={() => onClinkType("nomal")} />
              <span className="typeName">일반인</span>
            </div>
          </div>
        </SelectType>
        {type === "teacher" && <EmailForm setDoneConfirm={setDoneConfirm} setError={setError} setEmail={setEmail} />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            <span>아이디</span>
            <input type="text" {...register("username", { required: true })} autoComplete="off" />
          </InputLayout>
          <InputLayout>
            <span>
              비밀번호
                <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
            </span>
            <input type={visible ? "text" : "password"} {...register("password", { required: true })} autoComplete="off" />
          </InputLayout>
          <InputLayout>
            <span>
              비밀번호 확인
            </span>
            <input type={visible ? "text" : "password"} {...register("passwordConfirm", { required: true })} autoComplete="off" />
          </InputLayout>
          <InputBtn value="회원가입" disabled={!isValid || !doneConfirm} />
        </form>
        {error ? <ErrMsg error={error} /> : null}
      </FormLayout>
      <PageBar>
        <PageBarItem>
          <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
        </PageBarItem>
        <PageBarItem>
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            onClick={() => onCLickDarkMode(darkMode)}
            style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
          />
        </PageBarItem>
        <PageBarItem>
          <Link to="/login"><FontAwesomeIcon icon={faSignInAlt} /></Link>
        </PageBarItem>
        <PageBarItem>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </PageBarItem>
      </PageBar>
    </AccountContainer >);
}

export default CreateAccount;