import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ActionBox, ActionContent, BottomLine, LeaveBtn, NextStep } from './sharedStyles';

const AnswerAction = ({ question, questionNum, totalNum, setQuestionNum, setAction }) => {
  const processAnswer = () => {
    if (question.type === "tf") {
      if (question.answer === "false") {
        return "✕"
      } else {
        return "○"
      }
    }
    return question.answer
  }
  const onClickNextBtn = () => {
    if (questionNum === totalNum) {
      return
    }
    const newQuestionNum = questionNum + 1
    localStorage.setItem("questionNum", newQuestionNum)
    setQuestionNum(newQuestionNum)
    setAction(null)
  }
  const onCLickLeaveBtn = () => {
    setAction(null)
  }
  return (<ActionBox>
    <LeaveBtn><FontAwesomeIcon icon={faTimes} onClick={onCLickLeaveBtn} /></LeaveBtn>
    <ActionContent>{processAnswer()}</ActionContent>
    <NextStep>
      <div>학생 어쩌구</div>
      <div onClick={onClickNextBtn}>다음 문제</div>
    </NextStep>
    <BottomLine></BottomLine>
  </ActionBox>);
}

export default AnswerAction;