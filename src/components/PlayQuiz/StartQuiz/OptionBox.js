import { useReactiveVar } from '@apollo/client';
import { faHome, faImage, faMagic, faBell, faUserFriends, faStepBackward, faSun, faMoon, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../../apollo';

const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / -1;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 40px;
  justify-self: flex-end;
  font-size: 24px;
  position: relative;
`

const ActionBtn = styled.div`
  svg {
    color: ${props => props.selected ? "rgb(42, 140, 0)" : props.theme.fontColor};
    transition: color 0.6s ease;
    opacity: ${props => props.disabled ? 0.6 : 1};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    :hover {
      color: rgb(42, 140, 0);
    }
  }
`

const ActionBox = styled.div`
  animation: ${fadeIn} 0.6s ease;
  position: absolute;
  background-color: rgb(42, 140, 0);
  right: 50px;
  width: 1000px;
  height: 415px;
  border-radius: 5px;
  color: #ffffff;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto auto;
  row-gap: 20px;
`

const LeaveBtn = styled.div`
  justify-self: flex-end;
  margin-right: 15px;
  margin-top: 10px;
  cursor: pointer;
`

const ActionContent = styled.div`
  padding: 20px 40px;
  justify-self: center;
  font-size: 36px;
`

const NextStep = styled.div`
  font-size: 20px;
  margin-right: 40px;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 40px;
  div {
    cursor: pointer;
  }
`

const BottomLine = styled.div`
  background-color: rgb(158, 81, 26);
  height: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

const ImageBox = styled.div`
  position: absolute;
  top: -80px;
  right: 50px;
  height: 500px;
`

const ImageContent = styled.img`
  height: 500px;
  position: relative;
  border-radius: 5px;
`

const ImageLeaveBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: tomato;
  }
`

const OptionBox = ({ questionNum, setQuestionNum, action, setAction, question, totalNum }) => {
  const history = useHistory()
  const darkMode = useReactiveVar(darkModeVar)
  const onClickHomeBtn = () => {
    history.push("/")
  }
  const onClickBackBtn = () => {
    if (questionNum === 1) {
      window.alert("첫번째 문제입니다.")
    } else {
      const newQuestionNum = questionNum - 1
      localStorage.setItem("questionNum", newQuestionNum)
      setQuestionNum(newQuestionNum)
      setAction(null)
    }
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
  const onClickActionBtn = (type) => {
    if (type === "hint" && !question.hint) {
      return
    }
    if (type === "image" && !question.image) {
      return
    }
    setAction(type)
  }
  const onCLickDarkMode = () => {
    if (darkMode === true) {
      disableDarkMode()
    } else if (darkMode === false) {
      enableDarkMode()
    }
  }
  const onCLickLeaveBtn = () => {
    setAction(null)
  }
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
  return (<Container>
    <ActionBtn><FontAwesomeIcon icon={faHome} onClick={onClickHomeBtn} /></ActionBtn>
    <ActionBtn selected={action === "answer"}>
      <FontAwesomeIcon icon={faBell} onClick={() => onClickActionBtn("answer")} />
    </ActionBtn>
    <ActionBtn selected={action === "hint"} disabled={!question.hint}>
      <FontAwesomeIcon icon={faMagic} onClick={() => onClickActionBtn("hint")} />
    </ActionBtn>
    <ActionBtn selected={action === "image"} disabled={!question.image}>
      <FontAwesomeIcon icon={faImage} onClick={() => onClickActionBtn("image")} />
    </ActionBtn>
    <ActionBtn selected={action === "student"} >
      <FontAwesomeIcon icon={faUserFriends} onClick={() => onClickActionBtn("student")} />
    </ActionBtn>
    <ActionBtn><FontAwesomeIcon icon={faStepBackward} onClick={onClickBackBtn} /></ActionBtn>
    <ActionBtn>
      <FontAwesomeIcon
        icon={darkMode ? faSun : faMoon}
        onClick={onCLickDarkMode}
        style={{ color: `${darkMode ? "#ff765e" : "#212121"}` }}
      />
    </ActionBtn>
    {action === "answer" && <ActionBox>
      <LeaveBtn><FontAwesomeIcon icon={faTimes} onClick={onCLickLeaveBtn} /></LeaveBtn>
      <ActionContent>{processAnswer()}</ActionContent>
      <NextStep>
        <div>학생 어쩌구</div>
        <div onClick={onClickNextBtn}>다음 문제</div>
      </NextStep>
      <BottomLine></BottomLine>
    </ActionBox>}
    {action === "hint" && <ActionBox>
      <LeaveBtn><FontAwesomeIcon icon={faTimes} onClick={onCLickLeaveBtn} /></LeaveBtn>
      <ActionContent>{question.hint}</ActionContent>
      <NextStep></NextStep>
      <BottomLine></BottomLine>
    </ActionBox>}
    {action === "image" && <ImageBox>
      <ImageLeaveBtn onClick={onCLickLeaveBtn} ><FontAwesomeIcon icon={faTimes} /></ImageLeaveBtn>
      <ImageContent src={question.image}></ImageContent>
    </ImageBox>}
  </Container>);
}

export default OptionBox;