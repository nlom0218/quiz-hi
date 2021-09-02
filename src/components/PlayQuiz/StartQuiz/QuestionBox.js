import { faFile, faHandRock } from '@fortawesome/free-regular-svg-icons';
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
  grid-template-rows: auto auto auto;
  box-shadow: ${props => props.theme.boxShadow};
  column-gap: 40px;
  row-gap: 40px;
  align-items: flex-start;
  transition: background-color 1s ease;
`

const ConsolationQuestion = styled.div``

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
  grid-template-columns: 60px 1fr auto;
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  column-gap: 40px;
`

const Question = styled.div``

const Score = styled.div`
  /* color: rgb(255, 165, 0, 0.8); */
  color: rgb(42, 140, 0);
  font-size: 32px;
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

const Author = styled.div`
  align-self: flex-end;
  opacity: ${props => props.opacity};
`


const QuestionBox = ({ setQuestionNum, questionNum, quizList, totalNum, student, setStduent }) => {
  const [action, setAction] = useState(null)
  const quizMode = localStorage.getItem("selectMode")
  const question = quizList.filter((item) => parseInt(item.order) === questionNum)[0]
  const goldenBellConsolation = () => {
    if (quizMode !== "goldenBell") {
      return false
    }
    if (question.consolation) {
      return true
    } else {
      return false
    }
  }
  const processScore = () => {
    if (quizMode === "score" || quizMode === "cooperation") {
      return true
    }
    return false
  }
  return (
    <Container>
      <StatusBar questionNum={questionNum} totalNum={totalNum} action={action} />
      <SQuestionBox opacity={action === null ? 1 : 0.2}>
        {goldenBellConsolation() && <ConsolationQuestion>
          <Wrapper style={{ color: "tomato" }}>
            <FontAwesomeIcon icon={faHandRock} />
            <Question>패자부활전 문제</Question>
          </Wrapper>
        </ConsolationQuestion>}
        <Wrapper>
          <FontAwesomeIcon icon={faFile} />
          <Question>{question.question}</Question>
          {processScore() && <Score>{question.score}점</Score>}
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
      </SQuestionBox>
      <Author opacity={action === null ? 1 : 0.2}>만든이: {question.author}</Author>
      <OptionBox
        questionNum={questionNum}
        totalNum={totalNum}
        setQuestionNum={setQuestionNum}
        action={action}
        setAction={setAction}
        question={question}
        student={student}
        setStduent={setStduent}
      />
    </Container>
  );
}

export default QuestionBox;