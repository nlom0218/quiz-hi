import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faListOl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import OptionBox from './OptionBox';

const Container = styled.div`
  padding: 40px 40px;
  background-color: ${props => props.theme.boxColor};
  /* border: 1px solid rgb(200, 200, 200, 0.8); */
  display: grid;
  grid-template-columns: 1fr auto;
  box-shadow: ${props => props.theme.boxShadow};
  column-gap: 40px;
  row-gap: 40px;
`

const Wrapper = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 100px 1fr;
  font-size: 22px;
  font-weight: 600;
`

const Question = styled.textarea`
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  padding: 0px;
  color: ${props => props.theme.fontColor};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }
`

const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 22px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-top: 3px;
    margin-right: 30px;
    align-self: flex-start;
  }
`

const DistractorTextarea = styled.textarea`
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  align-self: flex-start;
  justify-self: flex-start;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  padding: 0px;
  color: ${props => props.answer ? "tomato" : props.theme.fontColor};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }

`

const Answer = styled.div``


const QuestionBox = ({ setQuestionIndex, questionIndex }) => {
  const textarea = useRef()
  const distractor1 = useRef()
  const distractor2 = useRef()
  const distractor3 = useRef()
  const distractor4 = useRef()
  const [txtHeight, setTxtHeight] = useState(null)
  const [distractor1Height, setDistractor1Height] = useState(null)
  const [distractor2Height, setDistractor2Height] = useState(null)
  const [distractor3Height, setDistractor3Height] = useState(null)
  const [distractor4Height, setDistractor4Height] = useState(null)
  useEffect(() => {
    setTxtHeight(textarea.current.scrollHeight)
    if (question.type === "obj") {
      setDistractor1Height(distractor1.current.scrollHeight)
      setDistractor2Height(distractor2.current.scrollHeight)
      setDistractor3Height(distractor3.current.scrollHeight)
      setDistractor4Height(distractor4.current.scrollHeight)
    }
  }, [questionIndex])
  const processDistractor = (index) => {
    if (index === 0) {
      return distractor1
    } else if (index === 1) {
      return distractor2
    } else if (index === 2) {
      return distractor3
    } else if (index === 3) {
      return distractor4
    }
  }
  const processDistractorHeight = (index) => {
    if (index === 0) {
      return distractor1Height
    } else if (index === 1) {
      return distractor2Height
    } else if (index === 2) {
      return distractor3Height
    } else if (index === 3) {
      return distractor4Height
    }
  }
  const quizList = JSON.parse(localStorage.getItem("quizList"))
  const question = quizList[questionIndex]
  return (<Container>
    <Wrapper>
      <FontAwesomeIcon icon={faFile} />
      <Question
        value={question.question}
        cols={20}
        rows={1}
        txtHeight={txtHeight}
        readOnly="readOnly"
        ref={textarea}
      ></Question>
    </Wrapper>
    {question.type === "obj" &&
      <Wrapper>
        <FontAwesomeIcon icon={faListOl} />
        <DisTractorList>
          {question.distractor.split("//!@#").map((item, index) => {
            return <DisTractorItem key={index}>
              <div className="num">{`${index + 1}번`}</div>
              <DistractorTextarea
                value={item}
                cols={20}
                rows={1}
                ref={processDistractor(index)}
                txtHeight={processDistractorHeight(index)}
                readOnly="readOnly"
              ></DistractorTextarea>
            </DisTractorItem>
          })}
        </DisTractorList>
      </Wrapper>
    }
    {/* <Answer>{question.answer}</Answer> */}


    {/* <div onClick={() => {
      const newQuestionIndex = questionIndex + 1
      localStorage.setItem("questionIndex", newQuestionIndex)
      setQuestionIndex(newQuestionIndex)
    }}>+</div> */}
    <OptionBox />
  </Container>);
}

export default QuestionBox;