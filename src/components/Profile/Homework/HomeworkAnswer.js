import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { compare } from '../../../sharedFn';

const ObjAnswerInput = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* justify-items: center; */
`

const ObjAnswerList = styled.div`
  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`

const TFAnswerInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`

const TFAnswerList = styled.div`
  background-color: ${props => props.check ? "rgb(200, 200, 200, 0.6)" : "rgb(200, 200, 200, 0.2)"};
  padding: 10px 0px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.6s ease;
`

const SubAnswerInput = styled.input`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
`

const HomeworkAnswer = ({ type, register, id }) => {
  const [change, setChange] = useState(false)
  const onClickAnswer = (id, answer) => {
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const questionObj = homeworkScore.filter((item) => item.id === id)[0]
    const existQuestion = homeworkScore.filter((item) => item.id !== id)
    if (type === "obj") {
      let newQuestionObj = {}
      if (!questionObj.answer) {
        newQuestionObj = { ...questionObj, answer: [answer] }
      } else {
        if (!questionObj.answer.includes(answer)) {
          const newAnswer = [...questionObj.answer, answer]
          newQuestionObj = { ...questionObj, answer: newAnswer }
        } else {
          const newAnswer = questionObj.answer.filter((item) => item !== answer)
          newQuestionObj = { ...questionObj, answer: newAnswer }
        }
      }
      const newHomeworkSocre = [...existQuestion, newQuestionObj]
      localStorage.setItem("homeworkScore", JSON.stringify(newHomeworkSocre))
    }
    if (type === "tf") {
      const newQuestionObj = { ...questionObj, answer }
      const newHomeworkSocre = [...existQuestion, newQuestionObj]
      localStorage.setItem("homeworkScore", JSON.stringify(newHomeworkSocre))
    }
    setChange(prev => !prev)
  }
  const processAnswer = (id, answer) => {
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const questionObj = homeworkScore.filter((item) => item.id === id)[0]
    if (type === "obj") {
      if (!questionObj.answer) {
        return false
      } else {
        if (!questionObj.answer.includes(answer)) {
          return false
        } else {
          return true
        }
      }
    }
    if (type === "tf") {
      if (questionObj.answer === answer) {
        return true
      } else {
        return false
      }
    }
  }
  return (<React.Fragment>
    {type === "obj" && <ObjAnswerInput>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "1") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "1")}
        /> 1번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "2") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "2")}
        /> 2번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "3") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "3")}
        /> 3번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={processAnswer(id, "4") ? faCheckCircle : faCircle}
          onClick={() => onClickAnswer(id, "4")}
        /> 4번
      </ObjAnswerList>
    </ObjAnswerInput>}
    {type === "tf" && <TFAnswerInput>
      <TFAnswerList onClick={() => onClickAnswer(id, true)} check={processAnswer(id, true)} >○</TFAnswerList>
      <TFAnswerList onClick={() => onClickAnswer(id, false)} check={processAnswer(id, false)} >✕</TFAnswerList>
    </TFAnswerInput>}
    {type === "sub" &&
      <SubAnswerInput
        {...register(`answer${id}`, { required: true })}
        type="text"
      />
    }
  </React.Fragment>);
}

export default HomeworkAnswer;