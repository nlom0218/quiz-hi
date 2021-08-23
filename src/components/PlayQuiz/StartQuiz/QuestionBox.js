import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import OptionBox from './OptionBox';
import StatusBar from './StatusBar';

const Container = styled.div`
  padding: 40px 40px;
  background-color: ${props => props.theme.boxColor};
  display: grid;
  grid-template-columns: 1000px 1fr;
  grid-template-rows: auto auto;
  box-shadow: ${props => props.theme.boxShadow};
  column-gap: 40px;
  row-gap: 40px;
  align-items: flex-start;
  transition: background-color 1s ease;
`

const SQuestionBox = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  transition: opacity 0.6s ease;
  opacity: ${props => props.opacity};
`

const Wrapper = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 100px 1fr;
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
`

const Question = styled.div`
  font-size: 26px;
  font-weight: 600;
  width: 100%;
  resize: none;
  border: none;
  padding: 0px;
`

const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 26px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  line-height: 32px;
  .num {
    margin-right: 26px;
    align-self: flex-start;
  }
`

const Distractor = styled.div`
  font-size: 26px;
  font-weight: 600;
  align-self: flex-start;
  justify-self: flex-start;
`

const Answer = styled.div``


const QuestionBox = ({ setQuestionNum, questionNum, quizList, totalNum }) => {
  const [action, setAction] = useState(null)
  const question = quizList.filter((item) => parseInt(item.order) === questionNum)[0]
  return (
    <Container>
      <StatusBar questionNum={questionNum} totalNum={totalNum} action={action} />
      <SQuestionBox opacity={action === null ? 1 : 0.2}>
        <Wrapper>
          <FontAwesomeIcon icon={faFile} />
          <Question>{question.question}</Question>
        </Wrapper>
        {question.type === "obj" &&
          <Wrapper>
            <FontAwesomeIcon icon={faListOl} />
            <DisTractorList>
              {question.distractor.split("//!@#").map((item, index) => {
                return <DisTractorItem key={index}>
                  <div className="num">{`${index + 1}번`}</div>
                  <Distractor>{item}</Distractor>
                </DisTractorItem>
              })}
            </DisTractorList>
          </Wrapper>
        }
        {/* <Answer>{question.answer}</Answer> */}
        <Wrapper>
          <div onClick={() => {
            if (questionNum === totalNum) {
              return
            }
            const newQuestionNum = questionNum + 1
            localStorage.setItem("questionNum", newQuestionNum)
            setQuestionNum(newQuestionNum)
          }}>+</div>
          <div onClick={() => {
            if (questionNum === 1) {
              return
            }
            const newQuestionNum = questionNum - 1
            localStorage.setItem("questionNum", newQuestionNum)
            setQuestionNum(newQuestionNum)
          }}>-</div>
        </Wrapper>
      </SQuestionBox>
      <OptionBox
        questionNum={questionNum}
        totalNum={totalNum}
        setQuestionNum={setQuestionNum}
        action={action}
        setAction={setAction}
        question={question}
      />
    </Container>
  );
}

export default QuestionBox;