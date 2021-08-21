import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import { compare } from '../../sharedFn';

const Container = styled.div`
  animation: ${fadeIn} 0.6s ease;
  padding-top: 30px;
  border-top: rgb(200, 200, 200, 0.6) 1px solid;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`

const CallQuizInfo = styled.div``

const SeleteAllBtn = styled.div`
  justify-self: flex-end;
  svg {
    cursor: pointer;
  }
`

const StudentList = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
`

const StudentItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr auto;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  svg {
    cursor: pointer;
  }
`

const StudentListEven = styled.div`
  align-self: flex-start;
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
`

const StudentInfo = styled.div``

const CallQuiz = () => {
  const user = useUser()
  const [students, setStduents] = useState([])
  const onClickSelectBtn = (nickname, id) => {
    const exist = students.some((item) => item.nickname === nickname)
    let newStudents = []
    if (!exist) {
      newStudents = [...students, { nickname, id }].sort(compare("id"))
    } else {
      newStudents = students.filter((item) => item.nickname !== nickname).sort(compare("id"))
    }
    setStduents(newStudents)
  }
  const checkStudent = (nickname) => {
    const exist = students.some((item) => item.nickname === nickname)
    if (exist) {
      return true
    } else {
      return false
    }
  }
  const onClickSelectAllBtn = () => {
    const existAll = user.students.map((item) => {
      const studentsNickname = students.map((item) => item.nickname)
      if (studentsNickname.includes(item.nickname)) {
        return true
      } else {
        return false
      }
    }).every((item) => item === true)
    if (existAll) {
      setStduents([])
    } else {
      const newStudents = user.students.map((item) => {
        return {
          nickname: item.nickname,
          id: item.id
        }
      })
      setStduents(newStudents)
    }
  }
  const checkStudentAll = () => {
    const existAll = user.students.map((item) => {
      const studentsNickname = students.map((item) => item.nickname)
      if (studentsNickname.includes(item.nickname)) {
        return true
      } else {
        return false
      }
    }).every((item) => item === true)
    if (existAll) {
      return true
    } else {
      return false
    }
  }
  return (<Container>
    <CallQuizInfo>퀴즈에 참여하는 학생을 선택해 주세요.</CallQuizInfo>
    <SeleteAllBtn>모두 선택하기 <FontAwesomeIcon icon={checkStudentAll() ? faCheckSquare : faSquare} onClick={onClickSelectAllBtn} /></SeleteAllBtn>
    <StudentList>
      {user.students.map((item, index) => {
        if ((index + 1) % 2 === 0) {
          return
        } else {
          return <StudentItem key={index}>
            <StudentInfo>
              {index + 1}번 {item.nickname}
            </StudentInfo>
            <FontAwesomeIcon icon={checkStudent(item.nickname) ? faCheckSquare : faSquare} onClick={() => onClickSelectBtn(item.nickname, item.id)} />
          </StudentItem>
        }
      })}
    </StudentList>
    <StudentListEven>
      {user.students.map((item, index) => {
        if ((index + 1) % 2 === 1) {
          return
        } else {
          return <StudentItem key={index}>
            <StudentInfo>
              {index + 1}번 {item.nickname}
            </StudentInfo>
            <FontAwesomeIcon icon={checkStudent(item.nickname) ? faCheckSquare : faSquare} onClick={() => onClickSelectBtn(item.nickname, item.id)} />
          </StudentItem>
        }
      })}
    </StudentListEven>
  </Container>);
}

export default CallQuiz;