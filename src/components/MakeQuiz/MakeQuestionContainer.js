import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SubQuestion from './SubQuestion';
import ObjQuestion from "./ObjQuestion"
import TFQuestion from "./TFQuestion"
import { fadeIn } from '../../animation/fade';

const SMakeQuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`

const QuestionNum = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

const QuestionType = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-columns: auto 1fr;
  span {
    grid-column: 1 / -1;
    margin-bottom: 15px;
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

const QuizSaveMsg = styled.div`
    animation: ${fadeIn} 0.6s linear forwards;
    .mainMsg{
      margin-bottom: 15px;
      font-size: 18px;
      font-weight: 600;
    }
    .subMsg {
      color: tomato;
    }
    margin-bottom: 30px;
`

const MakeQuestionContainer = ({ quizTags, setQuestionIdArr, questionIdArr, questionNum, setQuestionNum, num, imageId }) => {
  const [nextMode, setNextMode] = useState("")
  // sub, obj, tf
  const [quizType, setQuizType] = useState("sub")
  const onClickType = (type) => {
    setQuizType(type)
  }
  useEffect(() => {
    if (nextMode === "newQuestion") {
      setQuestionNum([...questionNum, "p"])
    }

  }, [nextMode])
  return (<SMakeQuestionContainer>
    <QuestionNum>{num}번 문제</QuestionNum>
    { nextMode === "" ?
      <QuestionType>
        <span>・ 문제 유형을 선택하세요.</span>
        <Types> <React.Fragment>
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
          </div></React.Fragment>
        </Types>
      </QuestionType> :
      <QuizSaveMsg>
        <div className="mainMsg">{num}번 문제가 생성되었습니다.</div>
        <div className="subMsg">문제는 자동으로 프로필 ‣ 업로드 ‣ 문제에 저장이 됩니다.</div>
      </QuizSaveMsg>
    }
    {quizType === "sub"
      && <SubQuestion
        quizTags={quizTags}
        quizType={quizType}
        setQuestionIdArr={setQuestionIdArr}
        questionIdArr={questionIdArr}
        nextMode={nextMode}
        setNextMode={setNextMode}
        imageId={imageId}
      />}
    {quizType === "obj"
      && <ObjQuestion
        quizTags={quizTags}
        quizType={quizType}
        setQuestionIdArr={setQuestionIdArr}
        questionIdArr={questionIdArr}
        nextMode={nextMode}
        setNextMode={setNextMode}
        imageId={imageId}
      />}
    {quizType === "tf"
      && <TFQuestion
        quizTags={quizTags}
        quizType={quizType}
        setQuestionIdArr={setQuestionIdArr}
        questionIdArr={questionIdArr}
        nextMode={nextMode}
        setNextMode={setNextMode}
        imageId={imageId}
      />}
  </SMakeQuestionContainer>);
}

export default MakeQuestionContainer;