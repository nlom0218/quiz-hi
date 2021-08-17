import { useMutation, useReactiveVar } from '@apollo/client';
import { faCircle, faEye, faEyeSlash, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { darkModeVar, logInUser } from '../apollo';
import AccountContainer from '../components/Account/AccountContainer';
import ErrMsg from '../components/Account/ErrMsg';
import FormLayout from '../components/Account/FormLayout';
import InputBtn from '../components/InputBtn';
import InputLayout from '../components/Account/InputLayout';
import Title from '../components/Account/Title';
import PageBar from '../components/Account/PageBar';
import PageBarItem from '../components/Account/PageBarItem';
import { onCLickDarkMode } from '../sharedFn';
import QusetionContainer from '../components/Question/QuestionContainer';
import LoginQuestion from '../components/Question/LoginQuestion';

const SelectType = styled.div`
  .title {
    margin-bottom: 20px;
  }
  .selectBox {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    svg {
      font-size: 14px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!, $type: String!) {
    login(username: $username, password: $password, type: $type) {
      ok
      error
      token
    }
  }
`

const Login = () => {
  const darkMode = useReactiveVar(darkModeVar)
  const history = useHistory()
  const [type, setType] = useState("teacher")
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(undefined)
  const [questionMode, setQuestionMode] = useState(false)
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (data) => {
    const { login: { ok, error, token } } = data
    if (error) {
      setError(error)
    }
    if (ok) {
      logInUser(token)
      history.push("/")
    }
  }
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted
  })
  const onClickType = (type) => {
    setType(type)
  }
  const onClickEye = () => {
    if (visible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { username, password } = data
    login({
      variables: { username, password, type }
    })
  }
  const onClickQuestionMode = () => {
    setQuestionMode(true)
  }
  return (
    <AccountContainer>
      <Title page="로그인" />
      <FormLayout>
        <form className="loginCreateAccountForm" onSubmit={handleSubmit(onSubmit)}>
          <SelectType>
            <div className="title">계정 유형</div>
            <div className="selectBox">
              <div className="selectItem">
                <FontAwesomeIcon icon={type === "teacher" ? faCheckCircle : faCircle} onClick={() => onClickType("teacher")} />
                <span className="typeName">선생님</span>
              </div>
              <div className="selectItem">
                <FontAwesomeIcon icon={type === "nomal" ? faCheckCircle : faCircle} onClick={() => onClickType("nomal")} />
                <span className="typeName">일반인</span>
              </div>
              <div className="selectItem">
                <FontAwesomeIcon icon={type === "student" ? faCheckCircle : faCircle} onClick={() => onClickType("student")} />
                <span className="typeName">학생</span>
              </div>
            </div>
          </SelectType>
          <InputLayout>
            <span>아이디</span>
            <input
              {...register("username", {
                required: true
              })}
              type="text"
              autoComplete="off"
            />
          </InputLayout>
          <InputLayout>
            <span>
              비밀번호
                <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
            </span>
            <input
              {...register("password", {
                required: true
              })}
              type={visible ? "text" : "password"}
              autoComplete="off"
            />
          </InputLayout>
          <InputBtn value="로그인" disabled={!isValid} bgColor="rgb(67, 216, 122)" />
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
          <Link to="/create-account"><span>N</span></Link>
        </PageBarItem>
        <PageBarItem>
          <FontAwesomeIcon icon={faQuestionCircle} onClick={onClickQuestionMode} />
        </PageBarItem>
      </PageBar>
      {questionMode && <QusetionContainer pageTitle="로그인" setQuestionMode={setQuestionMode} >
        <LoginQuestion />
      </QusetionContainer>}
    </AccountContainer>);
}

export default Login;