import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Homework from '../ManagemnetStudent/Homework';
import StudentList from '../ManagemnetStudent/StudentList';
import StudentQuizScore from '../ManagemnetStudent/StudentQuizScore';
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

const StudentHomework = ({ students, id, type, quizId, username, state }) => {
  const history = useHistory()
  useEffect(() => {
    if (type !== "student") {
      history.push(`/profile/${username}/info`)
    }
  })
  return (<Container>
    <Wrapper>
      <Title>숙제 목록</Title>
      <Homework students={students} id={id} type={type} />
    </Wrapper>
    {state === "solve" &&
      <React.Fragment>
        <DivisionLine></DivisionLine>
        <SolveHomework quizId={quizId} />
      </React.Fragment>}
    {state === "result" && <React.Fragment>
      <DivisionLine></DivisionLine>
    </React.Fragment>}
  </Container>);
}

export default StudentHomework;