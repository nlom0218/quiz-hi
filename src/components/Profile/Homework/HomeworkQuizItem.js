import { faBell, faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import { faListOl, faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import HomeworkAnswer from './HomeworkAnswer';
import HomeworkAnswerResult from './HomeworkAnswerResult';

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
`

const QuestionNum = styled.div`
  align-self: flex-start;
  display: grid;
  row-gap: 20px;
  svg {
    margin-right: 10px;
  }
`

const AnswerResult = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: tomato;
`

const QeustionBox = styled.div`
  background-color: ${props => props.theme.boxColor};
  padding: 30px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow};
  display: grid;
  grid-template-columns: 1fr 100px;
  row-gap: 40px;
  transition: background-color 1s ease;
`

const QuestionScore = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  justify-self: flex-end;
  color: ${props => props.theme.blueColor};
  transition: color 1s ease;
  font-weight: 600;
`

const Wrapper = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 100px 1fr;
  line-height: 20px;
  .imgBox {
    width: 100%;
  }
`

const FormWrapper = styled.form`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 100px 1fr;
  line-height: 20px;
`

const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 26px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 26px;
    align-self: flex-start;
  }
`

const Distractor = styled.div`
  align-self: flex-start;
  justify-self: flex-start;
  color: ${props => props.checkAnswer ? "tomato" : props.theme.fontColor};
`

const StudentAnswer = styled.div`
  color: ${props => props.theme.blueColor};
  transition: color 1s ease;
`

const HomeworkQuizItem = ({ question, index, setChange, resultArr }) => {
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange",
    ...(!resultArr && {
      defaultValues: {
        ...(JSON.parse(localStorage.getItem("homeworkScore")).filter((item) => item.id === question.id)[0].answer ?
          { answer: JSON.parse(localStorage.getItem("homeworkScore")).filter((item) => item.id === question.id)[0].answer } : ""
        )
      }
    })
  })
  const onSubmit = (data) => {
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const questionObj = homeworkScore.filter((item) => item.id === question.id)[0]
    const existQuestion = homeworkScore.filter((item) => item.id !== question.id)
    const newQuestionObj = { ...questionObj, answer: data.answer }
    const newHomeworkSocre = [...existQuestion, newQuestionObj]
    localStorage.setItem("homeworkScore", JSON.stringify(newHomeworkSocre))
    setChange(prev => !prev)
  }
  const processMyAnswer = () => {
    const homeworkQuiz = JSON.parse(localStorage.getItem("homeworkQuiz"))
    const questionObj = homeworkQuiz.filter((item) => item.id === question.id)[0]
    if (question.type == "tf") {
      if (questionObj.studentAnswer === "true") {
        return "○"
      } else {
        return "✕"
      }
    }
    return questionObj.studentAnswer
  }
  const checkAnswer = (num) => {
    if (!resultArr) {
      return false
    }
    const homeworkQuiz = JSON.parse(localStorage.getItem("homeworkQuiz"))
    const questionObj = homeworkQuiz.filter((item) => item.id === question.id)[0]
    const answerArr = questionObj.answer.split(",")
    if (answerArr.includes("" + num)) {
      return true
    } else {
      return false
    }
  }
  const processAnswerResult = () => {
    const homeworkQuiz = JSON.parse(localStorage.getItem("homeworkQuiz"))
    const questionObj = homeworkQuiz.filter((item) => item.id === question.id)[0]
    if (questionObj.result === false) {
      return "오답"
    } else if (questionObj.result === true) {
      return "정답"
    }
  }
  return (<Container>
    <QuestionNum>
      <div>{index + 1}번 문제</div>
      {resultArr &&
        <AnswerResult>{processAnswerResult()}</AnswerResult>
      }
    </QuestionNum>
    <QeustionBox>
      <Wrapper>
        <div><FontAwesomeIcon icon={faFile} /> 문제</div>
        <div>{question.question}</div>
      </Wrapper>
      {question.image && <Wrapper>
        <div><FontAwesomeIcon icon={faImage} /> 이미지</div>
        <img className="imgBox" src={question.image} />
      </Wrapper>}
      {question.type === "obj" &&
        <Wrapper>
          <div><FontAwesomeIcon icon={faListOl} /> 선택지</div>
          <DisTractorList>
            {question.distractor.split("//!@#").map((item, index) => {
              return <DisTractorItem key={index}>
                <div className="num">{`${index + 1}번`}</div>
                <Distractor checkAnswer={checkAnswer(index + 1)}>{item}</Distractor>
              </DisTractorItem>
            })}
          </DisTractorList>
        </Wrapper>
      }
      {question.hint && <Wrapper>
        <div><FontAwesomeIcon icon={faMagic} /> 힌트</div>
        <div>{question.hint}</div>
      </Wrapper>}
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div><FontAwesomeIcon icon={faBell} /> 정답</div>
        {!resultArr && <HomeworkAnswer type={question.type} questionNum={index + 1} register={register} id={question.id} isValid={isValid} setChange={setChange} />}
        {resultArr && <HomeworkAnswerResult resultArr={resultArr} type={question.type} id={question.id} />}
      </FormWrapper>
      {resultArr && <Wrapper>
        <div>나의 정답</div>
        <StudentAnswer>{processMyAnswer()}</StudentAnswer>
      </Wrapper>}
      <QuestionScore>{question.score} 점</QuestionScore>
    </QeustionBox>
  </Container>);
}

export default HomeworkQuizItem;