import React from 'react';
import styled from 'styled-components';
import { ActionBox, BottomLine, LeaveBtn, NextStep } from './sharedStyles';

const StudentList = styled.div`
  grid-column: 1 / -1;
  margin: 0px 40px;
  max-height: 380px;
  overflow-y: scroll;
  font-size: 24px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  align-self: flex-start;
  .goldenBell_students {
    display: flex;
    flex-wrap: wrap;
    line-height: 36px;
  }
  .goldenBell_student {
    margin-right: 30px;
  }
`

const StudentMsg = styled.div`

`

const ScoreBoard = styled.div`
  margin: 0px 40px;
  max-height: 380px;
  overflow-y: scroll;
  font-size: 24px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  align-self: flex-start;
`

const ScoreList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  background-color: rgb(200, 200, 200, 0.8);
`

const ScoreItem = styled.li`
  display: grid;
  grid-template-columns: 120px auto;
  padding: 15px 20px;
  background-color: rgb(42, 140, 0);
  line-height: 36px;
  .scoreItem_students {
    display: flex;
    flex-wrap: wrap;
  }
  .scoreItem_student {
    margin-right: 30px;
  }
`

const ScoreMsg = styled.div`
`

const ResultAction = ({ student }) => {
  const scoreArr = student.map((item) => item.score)
    .reduce((acc, cur, i, arr) => {
      if (arr.indexOf(cur) === i) acc.push(cur)
      return acc
    }, [])
    .sort((a, b) => b - a)
  console.log(scoreArr);
  const quizMode = localStorage.getItem("selectMode")
  const onClickEndBtn = () => {
    if (window.confirm("퀴즈를 종료하시겠습니까?")) {
      localStorage.removeItem("startQuiz")
      localStorage.removeItem("joinStudent")
      localStorage.removeItem("questionNum")
      window.location.reload()
    }
  }
  return (<ActionBox>
    <LeaveBtn></LeaveBtn>
    {quizMode === "goldenBell" ?
      <StudentList>
        <StudentMsg>골든벨을 울린 학생</StudentMsg>
        <div className="goldenBell_students">
          {student.map((item, index) => {
            if (!item.pass) { return }
            return <div key={index} className="goldenBell_student">{item.nickname}</div>
          })}
        </div>
      </StudentList>
      :
      <ScoreBoard>
        <ScoreMsg>점수판</ScoreMsg>
        <ScoreList>
          {scoreArr.map((item, index) => {
            return <ScoreItem key={index}>
              <div className="socre">{item}점</div>
              <div className="scoreItem_students">
                {student.filter((student) => student.score === item).map((student, index) => {
                  return <div className="scoreItem_student" key={index}>
                    {student.nickname}
                  </div>
                })}
              </div>
            </ScoreItem>
          })}
        </ScoreList>
      </ScoreBoard>
    }
    <NextStep>
      <div onClick={onClickEndBtn}>퀴즈 종료하기</div>
      <div >결과 저장하기</div>
    </NextStep>
    <BottomLine></BottomLine>
  </ActionBox>);
}

export default ResultAction;