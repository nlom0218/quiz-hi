import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import EmailConfirm from './EmailConfirm';

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
`

const EmailBtn = styled.button`
  background-color: rgb(67, 216, 122);
  opacity: ${props => props.disabled ? 0.2 : 0.9};
  padding: 10px 20px;
  border-radius: 5px;
  transition: opacity 0.6s linear;
  cursor: pointer;
`

const EmailForm = ({ setDoneConfirm, setError, setEmail }) => {
  const [confirmNum, setConfirmNum] = useState("")
  const [sendEmail, setSendEmail] = useState(false)
  const { register, handleSubmit, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { email } = data
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
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <span>이메일</span>
        <Input
          {...register("email", {
            required: true
          })}
          type="text"
        />
        <EmailBtn type="submit" disabled={!isValid} >
          <FontAwesomeIcon icon={faPaperPlane} />
        </EmailBtn>
      </Form>
      {sendEmail && <EmailConfirm confirmNum={confirmNum} setDoneConfirm={setDoneConfirm} setError={setError} />}
    </Wrapper>
  );
}

export default EmailForm;