import React from 'react';
import styled from 'styled-components';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SMarking = styled.div`
  align-self: flex-start;
  margin: 20px 40px;
  font-size: 18px;
  max-height: 340px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
`

const MarkingMsg = styled.div`
`

const CheckAll = styled.div`
  svg {
    cursor: pointer;
  }
`

const MarkingStudent = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgb(200, 200, 200, 0.8);
  background-color: rgb(200, 200, 200, 0.8);
  row-gap: 1px;
  column-gap: 1px;
`

const Student = styled.div`
  padding: 15px 20px;
  background-color: rgb(42, 140, 0);
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  svg {
    cursor: pointer;
  }
`

const Marking = ({ student, setPassStudentArr, passStudentArr, question }) => {
  console.log(passStudentArr);
  const onClickCheckAll = () => {
    if (localStorage.getItem("selectMode") === "goldenBell") {
      if (question.consolation === true) {
        const confirmArr = student.filter((item) => item.pass === false).map((item) => {
          if (student.filter((item) => item.pass === false).includes(item.id)) {
            return item.id
          } else {
            return false
          }
        })
        console.log(confirmArr);
        if (confirmArr.includes(false)) {
          setPassStudentArr(student.map((item) => item.id))
        } else {
          const newPassStudentArr = student.filter((item) => item.pass === true).map((item) => item.id)
          setPassStudentArr(newPassStudentArr)
        }
      } else {
        const confirmArr = student.filter((item) => item.pass === true).map((item) => {
          if (passStudentArr.includes(item.id)) {
            return item.id
          } else {
            return false
          }
        })
        if (confirmArr.includes(false)) {
          const newPassStudentArr = student.filter((item) => item.pass === true).map((item) => item.id)
          setPassStudentArr(newPassStudentArr)
        } else {
          setPassStudentArr([])
        }
      }
    }
  }

  const onClickStudentCheck = (id) => {
    if (localStorage.getItem("selectMode") === "goldenBell") {
      let newPassStudentArr = null
      if (passStudentArr.includes(id)) {
        newPassStudentArr = passStudentArr.filter((item) => item !== id)
      } else {
        newPassStudentArr = [...passStudentArr, id]
      }
      setPassStudentArr(newPassStudentArr)
    }
  }

  const processPassStudent = (id) => {
    if (passStudentArr.includes(id)) {
      return true
    } else {
      return false
    }
  }

  const processAllPass = () => {
    if (localStorage.getItem("selectMode") === "goldenBell") {
      if (question.consolation === true) {
        const confirmArr = student.filter((item) => item.pass === false).map((item) => {
          if (student.filter((item) => item.pass === false).includes(item.id)) {
            return item.id
          } else {
            return false
          }
        })
        if (confirmArr.includes(false)) {
          return false
        } else {
          return true
        }
      } else {
        const confirmArr = student.filter((item) => item.pass === true).map((item) => {
          if (passStudentArr.includes(item.id)) {
            return item.id
          } else {
            return false
          }
        })
        if (confirmArr.includes(false)) {
          return false
        } else {
          return true
        }
      }
    }
  }

  const processConsolationQuestion = () => {
    if (localStorage.getItem("selectMode") !== "goldenBell") {
      return false
    }
    if (question.consolation === true) {
      return true
    } else {
      return false
    }
  }
  return (<SMarking>
    <MarkingMsg>
      {processConsolationQuestion() ? "패자부활전 문제를" : "정답을"} 맞춘 학생을 선택한 뒤 다음 문제를 진행해 주세요.
    </MarkingMsg>
    <CheckAll>모두 선택하기 <FontAwesomeIcon icon={processAllPass() ? faCheckSquare : faSquare} onClick={onClickCheckAll} /></CheckAll>
    {processConsolationQuestion() ?
      <MarkingStudent>
        {student.map((item, index) => {
          if (item.pass === true) {
            return
          }
          return <Student key={index}>
            <div>{index + 1}번 {item.nickname.length > 5 ? `${item.nickname.substring(0, 5)}...` : item.nickname}</div>
            <div onClick={() => onClickStudentCheck(item.id)}>
              <FontAwesomeIcon icon={processPassStudent(item.id) ? faCheckSquare : faSquare} />
            </div>
          </Student>
        })}
      </MarkingStudent>
      :
      <MarkingStudent>
        {student.map((item, index) => {
          if (item.pass === false) {
            return
          }
          return <Student key={index}>
            <div>{index + 1}번 {item.nickname.length > 5 ? `${item.nickname.substring(0, 5)}...` : item.nickname}</div>
            <div onClick={() => onClickStudentCheck(item.id)}>
              <FontAwesomeIcon icon={processPassStudent(item.id) ? faCheckSquare : faSquare} />
            </div>
          </Student>
        })}
      </MarkingStudent>}
  </SMarking>);
}

export default Marking;