import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import Homework from '../ManagemnetStudent/Homework';
import SolveHomework from './SolveHomework';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  .delAccount {
    color: tomato;
  }
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const StudentHomework = ({ students, id, type, username }) => {
  const history = useHistory()
  const [quizId, setQuizId] = useState(localStorage.getItem("homeworkQuizId") || null)
  const [complete, setComplete] = useState(false)
  // complete(false) => 퀴즈가 안띄어짐. complete(true) => 퀴즈가 띄어짐
  // quizId를 받은 후 퀴즈 목록들을 localstorage에 저장 한 후 complete(true)로 변경
  // 숙제를 선택하게 될 때 에러를 방지하기 위해 complete(false)로 바꾸기
  // 에러가 나는 이유는 homeworkScore 와 homeworkQuiz가 충돌하게 된다.
  useEffect(() => {
    if (type !== "student") {
      history.push(`/profile/${username}/info`)
    }
  }, [])
  return (<Container>
    <Wrapper>
      <Title>숙제 목록</Title>
      <Homework students={students} id={id} type={type} setQuizId={setQuizId} setComplete={setComplete} />
    </Wrapper>
    {quizId && <React.Fragment>
      <DivisionLine></DivisionLine>
      <SolveHomework quizId={quizId} setComplete={setComplete} complete={complete} />
    </React.Fragment>}
  </Container>);
}

export default StudentHomework;