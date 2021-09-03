import React from 'react';
import styled from 'styled-components';
import DeleteAllStudentAccount from './DeleteAllStudentAccount';
import Homework from './Homework';
import StudentList from './StudentList';
import StudentQuizScore from './StudentQuizScore';

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

const ManagemnetStudent = ({ students, id, quizScore: teacherQuizScore, type }) => {
  return (<Container>
    <Wrapper>
      <Title>학생 목록</Title>
      <StudentList students={students} id={id} />
    </Wrapper>
    {students.length !== 0 &&
      <React.Fragment>
        <DivisionLine></DivisionLine>
        <Wrapper>
          <Title>퀴즈 점수</Title>
          <StudentQuizScore students={students} id={id} teacherQuizScore={teacherQuizScore} />
        </Wrapper>
        <DivisionLine></DivisionLine>
        <Wrapper>
          <Title>숙제</Title>
          <Homework students={students} id={id} type={type} />
        </Wrapper>
        <DivisionLine></DivisionLine>
        <Wrapper>
          <Title className="delAccount">학생 계정 삭제</Title>
          <DeleteAllStudentAccount />
        </Wrapper>
      </React.Fragment>
    }
  </Container>);
}

export default ManagemnetStudent;