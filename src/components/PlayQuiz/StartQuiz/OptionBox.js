import { useReactiveVar } from '@apollo/client';
import { faHome, faImage, faMagic, faBell, faUserFriends, faStepBackward, faSun, faMoon, faPlay, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { darkModeVar, disableDarkMode, enableDarkMode } from '../../../apollo';
import AnswerAction from './AnswerAction';
import HintAction from './HintAction';
import ImageAction from './ImageAction';
import ResultAction from './ResultAction';
import StudentAction from './StudentAction';

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

const OptionBox = ({ questionNum, setQuestionNum, action, setAction, question, totalNum, student, setStduent }) => {
  const history = useHistory()
  const darkMode = useReactiveVar(darkModeVar)
  const onClickHomeBtn = () => {
    history.push("/")
  }
  const onClickResetBtn = () => {
    if (window.confirm("퀴즈를 다시 시작하시겠습니까?")) {
      localStorage.setItem("questionNum", 1)
      setQuestionNum(1)
      const newStudent = student.map((item) => {
        return { nickname: item.nickname, id: item.id, pass: true, score: 0, order: item.order }
      })
      localStorage.setItem("joinStudent", JSON.stringify(newStudent))
      setStduent(newStudent)
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
    <ActionBtn><FontAwesomeIcon icon={faRedoAlt} onClick={onClickResetBtn} /></ActionBtn>
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
        student={student}
        setStduent={setStduent}
      />
    }
    {action === "hint" && <HintAction question={question} setAction={setAction} />}
    {action === "image" && <ImageAction question={question} setAction={setAction} />}
    {action === "student" && <StudentAction question={question} setAction={setAction} student={student} />}
    {action === "result" && <ResultAction question={question} setAction={setAction} student={student} />}
  </Container>);
}

export default OptionBox;