import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import SubQuestion from './SubQuestion';
import ObjQuestion from "./ObjQuestion"
import TFQuestion from "./TFQuestion"

const SMakeQuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`

const QuestionType = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-columns: auto 1fr;
  span {
    grid-column: 1 / -1;
    margin-bottom: 10px;
    font-size: 18px;
  }
  margin-bottom: 30px;
`

const Types = styled.div`
   grid-column: 1 / -1;
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   justify-items: start;
   align-items: center;
   svg {
     margin-right: 10px;
     font-size: 16px;
     cursor: pointer;
   }
`

const MakeQuestionContainer = ({ quizTags }) => {
  // sub, obj, tf
  const [quizType, setQuizType] = useState("sub")
  const onClickType = (type) => {
    setQuizType(type)
  }
  return (<SMakeQuestionContainer>
    <QuestionType>
      <span>・ 문제 유형을 선택하세요.</span>
      <Types>
        <div>
          <FontAwesomeIcon
            onClick={() => onClickType("sub")}
            icon={quizType === "sub" ? faCheckCircle : faCircle}
          />
          주관식
          </div>
        <div>
          <FontAwesomeIcon
            onClick={() => onClickType("obj")}
            icon={quizType === "obj" ? faCheckCircle : faCircle}
          />
          객관식
          </div>
        <div>
          <FontAwesomeIcon
            onClick={() => onClickType("tf")}
            icon={quizType === "tf" ? faCheckCircle : faCircle}
          />
          ○ / ✕
          </div>
      </Types>
    </QuestionType>
    {quizType === "sub" && <SubQuestion quizTags={quizTags} />}
    {quizType === "obj" && <ObjQuestion />}
    {quizType === "tf" && <TFQuestion />}
  </SMakeQuestionContainer>);
}

export default MakeQuestionContainer;