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
import { fadeOut, pageFadeIn } from '../animation/fade';
import { darkModeVar, logInUser } from '../apollo';
import Title from '../components/Account/Title';
import { onCLickDarkMode } from '../sharedFn';

const AccountContainer = styled.div`
  height: 100vh;
  width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 100px 400px 100px;
  grid-template-rows: 1fr auto 1fr;
  align-content: flex-start;
  animation: ${pageFadeIn} 0.6s linear forwards;
`

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

const FormContainer = styled.div`
  background-color: rgb(67, 216, 122, 0.2);
  padding: 20px 40px;
  box-shadow: 0px 17px 6px -14px rgb(0 0 0 / 20%);
  position: relative;
`

const FormLayout = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  span {
    margin-bottom: 10px;
  }
  svg {
    margin-left: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  input {
    background-color: rgb(67, 216, 122, 0.25);
    padding: 10px 20px;
    border-radius: 5px;
  }
  margin-bottom: 20px;
`

const InputBtn = styled.input`
  background-color: rgb(67, 216, 122, 0.9);
  opacity: ${props => props.disabled ? 0.3 : 0.9};
  text-align: center;
  font-weight: 600;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  transition: all 0.5s linear;
  cursor: pointer;
`

const ErrMsg = styled.span`
  position: absolute;
  width: 320px;
  text-align: center;
  bottom: -50px;
  color: tomato;
  animation: ${fadeOut} 4s forwards;
`

const PageBar = styled.div`
  align-self: flex-start;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(67, 216, 122);
  border-radius: 10px;
  padding: 0px 10px;
  opacity: 0.6;
  transition: all 0.3s linear;
  :hover {
    opacity: 1;
    background-color: rgb(67, 216, 122, 0.2);
  }
`

const BarItem = styled.div`
  :nth-child(1) {
    margin-top: 20px;
  }
  margin-bottom: 20px;
  cursor: pointer;
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
      <FormContainer>
        <FormLayout onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <span>아이디</span>
            <input
              {...register("username", {
                required: true
              })}
              type="text"
            />
          </InputContainer>
          <InputContainer>
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
          </InputContainer>
          <InputBtn type="submit" value="로그인" disabled={!isValid} />
        </FormLayout>
        {error ? <ErrMsg>{error}</ErrMsg> : null}
      </FormContainer>
      <PageBar>
        <BarItem><Link to="/"><FontAwesomeIcon icon={faHome} /></Link></BarItem>
        <BarItem>
          <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            onClick={() => onCLickDarkMode(darkMode)}
            style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
          />
        </BarItem>
        <BarItem><Link to="/create-account"><span>New</span></Link></BarItem>
        <BarItem><FontAwesomeIcon icon={faQuestionCircle} /></BarItem>
      </PageBar>
    </AccountContainer>);
}

export default Login;