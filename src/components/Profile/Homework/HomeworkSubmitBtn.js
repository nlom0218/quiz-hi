import React from 'react';
import styled from 'styled-components';

const SHomeworkSubmitBtn = styled.div`
  background-color: ${props => props.theme.blueColor};
  margin-left: 180px;
  padding: 10px;
  color: ${props => props.theme.bgColor};
  text-align: center;
  border-radius: 5px;
  transition: opacity 0.6s ease, background-color 1s ease, color 1s ease;
  cursor: pointer;
`

const HomeworkSubmitBtn = ({ setSaveMsg }) => {
  const onClickHomeworkSubmit = () => {
    const homeworkQuiz = JSON.parse(localStorage.getItem("homeworkQuiz"))
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const answerArr = homeworkScore.map((item) => item.answer)
    if (answerArr.includes(undefined)) {
      setSaveMsg("정답을 입력하지 않은 문제가 있습니다.")
    } else {
      const resultArr = homeworkQuiz.map((item) => {
        const studentAnswer = homeworkScore[homeworkScore.findIndex(homeworkScoreItem => homeworkScoreItem.id === item.id)].answer
        let result = undefined
        let studentAnswerStr = undefined
        if (item.type === "obj") {
          const quizAnswerStr = item.answer.split(",").sort().join(",")
          studentAnswerStr = studentAnswer.sort().join(",")
          result = quizAnswerStr === studentAnswerStr
        } else if (item.type === "tf") {
          studentAnswerStr = "" + studentAnswer
          result = item.answer === studentAnswerStr
        } else if (item.type === "sub") {
          const quizAnswerStr = item.answer.replace(/(\s*)/g, "").toLowerCase()
          studentAnswerStr = studentAnswer.replace(/(\s*)/g, "").toLowerCase()
          result = quizAnswerStr === studentAnswerStr
        }
        return { id: item.id, score: item.score, result, studentAnswer: studentAnswerStr }
      })
      const totalScore = resultArr.filter((item) => item.result === true).map((item) => item.score).reduce((acc, cur) => acc + cur, 0)
    }
  }
  return (<SHomeworkSubmitBtn onClick={onClickHomeworkSubmit}>제출하기</SHomeworkSubmitBtn>);
}

export default HomeworkSubmitBtn;