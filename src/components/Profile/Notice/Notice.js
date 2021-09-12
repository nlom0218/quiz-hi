import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeSharedStudent from './NoticeSharedStudent';

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

const Notice = ({ notice, id }) => {
  const [sharedStudentNotice, setSharedStudentNotice] = useState(notice.filter((item) => item.type === "sharedStudent"))
  return (<Container>
    <Wrapper>
      <Title>학생 공유 알림</Title>
      <NoticeSharedStudent sharedStudentNotice={sharedStudentNotice} userId={id} />
    </Wrapper>
    <DivisionLine></DivisionLine>
    <Wrapper>
      <Title>퀴즈 수정 알림</Title>
    </Wrapper>
    <DivisionLine></DivisionLine>
    <Wrapper>
      <Title>문제 수정 알림</Title>
    </Wrapper>
  </Container>);
}

export default Notice;