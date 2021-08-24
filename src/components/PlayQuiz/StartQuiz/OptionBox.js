import { useReactiveVar } from '@apollo/client';
import { faHome, faImage, faMagic, faBell, faUserFriends, faStepBackward, faSun, faMoon, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../../apollo';
import AnswerAction from './AnswerAction';
import HintAction from './HintAction';
import ImageAction from './ImageAction';

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

const OptionBox = ({ questionNum, setQuestionNum, action, setAction, question, totalNum, student }) => {
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
  const onClickActionBtn = (type) => {
    if (type === "hint" && !question.hint) {
      return
    }
    if (type === "image" && !question.image) {
      return
    }
    if (type === "student" && student.length === 0) {
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
    <ActionBtn selected={action === "student"} disabled={student.length === 0} >
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
    {action === "answer" &&
      <AnswerAction
        question={question}
        questionNum={questionNum}
        totalNum={totalNum}
        setQuestionNum={setQuestionNum}
        setAction={setAction}
      />
    }
    {action === "hint" && <HintAction question={question} setAction={setAction} />}
    {action === "image" && <ImageAction question={question} setAction={setAction} />}
  </Container>);
}

export default OptionBox;