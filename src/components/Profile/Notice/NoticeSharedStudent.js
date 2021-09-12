import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const CONNECT_SHARED_STUDENT_MUTATION = gql`
  mutation connectSharedStudent($userId: Int!, $studentId: String!) {
    connectSharedStudent(userId: $userId, studentId: $studentId) {
      ok
      error
    }
  }
`

const NoticeSharedStudent = ({ sharedStudentNotice, userId }) => {
  const onCompleted = (result) => {
    const { connectSharedStudent: { ok, error } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [connectSharedStudent, { loading }] = useMutation(CONNECT_SHARED_STUDENT_MUTATION, {
    onCompleted
  })
  const onClickAcceptBtn = (studentId) => {
    if (loading) {
      return
    }
    connectSharedStudent({
      variables: {
        userId,
        studentId
      }
    })
  }

  return (<Container>
    {sharedStudentNotice.map((item, index) => {
      return <div key={index}>{item.sender} {item.message}
        <div onClick={() => onClickAcceptBtn(item.info)}>수락</div>
      </div>
    })}
  </Container>);
}

export default NoticeSharedStudent;