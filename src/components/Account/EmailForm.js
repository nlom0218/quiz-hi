import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRedoAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import EmailConfirm from './EmailConfirm';

const Wrapper = styled.div``

const Form = styled.form`
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  row-gap: 10px;
  span {
    grid-column: 1 / 3;
  }
`

const Input = styled.input`
  grid-column: 1 / 2;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(200, 200, 200, 0.2);
  transition: background-color 1s ease, box-shadow 0.4s linear;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
  }
`

const EmailBtn = styled.button`
  background-color: rgb(200, 200, 200);
  opacity: ${props => props.disabled ? 0.2 : 0.9};
  padding: 10px 20px;
  border-radius: 5px;
  transition: opacity 0.6s linear;
  cursor: pointer;
  div {
    font-size: 12px;
  }
`

const PlatForm = styled.div`
  text-align: center;
  margin-bottom: 40px;
  a {
    color: tomato;
    opacity: 1;
    margin-right: 20px;
  }
  svg  {
    cursor: pointer;
    color: tomato;
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
  const [sending, setSending] = useState(false)
  const { register, handleSubmit, formState: { isValid }, setValue } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { email } = data
    const randomNum = Math.floor(Math.random() * 1000000)
    setConfirmNum(randomNum)
    setSending(true)
    emailjs.send(
      "service_y3st5zf",
      "template_9ibugnm",
      {
        email,
        confirmNum: randomNum
      },
      "user_sJAAszXnKTFqusb3xguHm")
      .then((result) => {
        setSendEmail(true)
        setSending(false)
        setEmail(email)
        setPlatForm(email.split("@").reverse()[0])
      }, (error) => {
        console.log(error.text);
      })
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
          {sending ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faPaperPlane} />}
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