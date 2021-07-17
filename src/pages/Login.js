import { useMutation, useReactiveVar } from '@apollo/client';
import { faEye, faEyeSlash, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faHome, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
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
import InputBtn from '../components/Account/InputBtn';
import InputLayout from '../components/Account/InputLayout';
import Title from '../components/Account/Title';
import PageBar from '../components/PageBar';
import PageBarItem from '../components/PageBarItem';
import { onCLickDarkMode } from '../sharedFn';

const SelectType = styled.div`
  justify-self: flex-end;
  grid-column: 1 / 2;
  ul {
    li {
      padding: 10px 10px 10px 0px;
      margin-bottom: 10px;
      cursor: pointer;
      width: 100px;
      text-align: end;
      font-size: 16px;
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
      transition: background-color linear 0.3s;
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
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (data) => {
    const { login: { ok, error, token } } = data
    if (error) {
      setError(error)
      setTimeout(() => {
        setError(undefined)
      }, 4000)
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
  return (
    <AccountContainer>
      <Title page="로그인" />
      <SelectType>
        <ul>
          <li onClick={() => onClickType("teacher")}
            style={{
              backgroundColor: `${type === "teacher" ? "rgb(67, 216, 122, 0.2)" : "rgb(67, 216, 122, 0.1)"}`
            }}
          >선생님</li>
          <li onClick={() => onClickType("student")}
            style={{
              backgroundColor: `${type === "student" ? "rgb(67, 216, 122, 0.2)" : "rgb(67, 216, 122, 0.1)"}`
            }}
          >학생</li>
          <li onClick={() => onClickType("nomal")}
            style={{
              backgroundColor: `${type === "nomal" ? "rgb(67, 216, 122, 0.2)" : "rgb(67, 216, 122, 0.1)"}`
            }}
          >일반인</li>
        </ul>
      </SelectType>
      <FormLayout bgColor="rgb(67, 216, 122, 0.2)">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLayout bgColor="rgb(67, 216, 122, 0.25)">
            <span>아이디</span>
            <input
              {...register("username", {
                required: true
              })}
              type="text"
            />
          </InputLayout>
          <InputLayout bgColor="rgb(67, 216, 122, 0.25)">
            <span>
              비밀번호
                <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} onClick={onClickEye} />
            </span>
            <input
              {...register("password", {
                required: true
              })}
              type={visible ? "text" : "password"}
            />
          </InputLayout>
          <InputBtn type="submit" value="로그인" disabled={!isValid} />
        </form>
        {error ? <ErrMsg error={error} /> : null}
      </FormLayout>
      <PageBar borderColor="rgb(67, 216, 122)" hoverBgColor="rgb(67, 216, 122, 0.2)">
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
          <Link to="/create-account"><span>New</span></Link>
        </PageBarItem>
        <PageBarItem>
          <FontAwesomeIcon icon={faQuestionCircle} />
        </PageBarItem>
      </PageBar>
    </AccountContainer>);
}

export default Login;