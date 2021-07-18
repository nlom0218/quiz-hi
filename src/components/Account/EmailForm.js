import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPaperPlane, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import EmailConfirm from './EmailConfirm';
import { Link } from 'react-router-dom';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const Wrapper = styled.div``

const Form = styled.form`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-gap: 10px;
  span {
    grid-column: 1 / 3;
  }
`

const Input = styled.input`
  grid-column: 1 / 2;
  background-color:  rgb(67, 216, 122, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.2s linear;
    :focus {
      background-color: rgb(67, 216, 122, 0.6);
    }
`

const EmailBtn = styled.button`
  background-color: rgb(67, 216, 122);
  opacity: ${props => props.disabled ? 0.2 : 0.9};
  padding: 10px 20px;
  border-radius: 5px;
  transition: opacity 0.6s linear;
  cursor: pointer;
`

const PlatForm = styled.div`
  text-align: center;
  margin-bottom: 20px;
  a {
    color: tomato;
    opacity: 1;
    margin-right: 20px;
  }
  svg  {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s linear;
    :hover {
      opacity: 1;
    }
  }
`

const EmailForm = ({ setDoneConfirm, setError, setEmail }) => {
  const [confirmNum, setConfirmNum] = useState("")
  const [sendEmail, setSendEmail] = useState(false)
  const [platform, setPlatForm] = useState("")
  const { register, handleSubmit, formState: { isValid }, setValue } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { email } = data
    console.log(email);
    const randomNum = Math.floor(Math.random() * 1000000)
    setConfirmNum(randomNum)
    // emailjs.send(
    //   "service_y3st5zf",
    //   "template_9ibugnm",
    //   {
    //     email,
    //     confirmNum: randomNum
    //   },
    //   "user_sJAAszXnKTFqusb3xguHm")
    //   .then((result) => {
    //   }, (error) => {
    //     console.log(error.text);
    //   })
    setSendEmail(true)
    setEmail(email)
    setPlatForm(email.split("@").reverse()[0])
  }
  const onClinkAgainBtn = () => {
    setSendEmail(false)
    setValue("email", "")
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <span>이메일</span>
        <Input
          {...register("email", {
            required: true,
            pattern: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
          })}
          type="text"
          autoComplete="off"
        />
        <EmailBtn type="submit" disabled={!isValid || sendEmail} >
          <FontAwesomeIcon icon={faPaperPlane} />
        </EmailBtn>
      </Form>
      {sendEmail &&
        <React.Fragment>
          <EmailConfirm confirmNum={confirmNum} setDoneConfirm={setDoneConfirm} setError={setError} />
          <PlatForm>
            <a href={`https://${platform}`} target="_blank">
              {platform}로 이동하기
            </a>
            <FontAwesomeIcon icon={faRedoAlt} onClick={onClinkAgainBtn} />
          </PlatForm>
        </React.Fragment>
      }
    </Wrapper>
  );
}

export default EmailForm;