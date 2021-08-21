import React from 'react';
import styled from 'styled-components';
import StudentList from './StudentList';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const ManagemnetStudent = ({ students, id }) => {
  return (<Container>
    <Wrapper>
      <Title>학생목록</Title>
      <StudentList students={students} id={id} />
    </Wrapper>
  </Container>);
}

export default ManagemnetStudent;