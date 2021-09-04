import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';

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

const CREATE_HOMEWORK_RESULT__MUTATION = gql`
  mutation createHomeworkResult($quizId: Int!, $result: String!, $order: Int!, $score: Int!) {
    createHomeworkResult(quizId: $quizId, result: $result, order: $order, score: $score) {
      ok
    }
  }
`

const HomeworkSubmitBtn = ({ setSaveMsg }) => {
  const history = useHistory()
  const user = useUser()
  const onCompleted = (result) => {
    const { createHomeworkResult: { ok } } = result
    if (ok) {
      window.alert("숙제가 제출되었습니다.")
      history.push(`/profile/${user.username}/homework`)
    }
  }
  const [createHomeworkResult, { loading }] = useMutation(CREATE_HOMEWORK_RESULT__MUTATION, {
    onCompleted
  })
  const onClickHomeworkSubmit = () => {
    if (loading) {
      return
    }
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
      if (window.confirm("숙제를 제출 하겠습니끼? \n제출한 숙제는 이후에 정답을 수정 할 수 없습니다.")) {
        createHomeworkResult({
          variables: {
            quizId: parseInt(localStorage.getItem("homeworkQuizId")),
            result: JSON.stringify(resultArr),
            order: parseInt(localStorage.getItem("homeworkOrder")),
            score: totalScore
          }
        })
      }
    }
  }
  return (<SHomeworkSubmitBtn onClick={onClickHomeworkSubmit}>
    {loading ? "제출중..." : "제출하기"}
  </SHomeworkSubmitBtn>);
}

export default HomeworkSubmitBtn;