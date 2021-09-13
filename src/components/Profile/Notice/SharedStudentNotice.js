import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

const CONNECT_SHARED_STUDENT_MUTATION = gql`
  mutation connectSharedStudent($userId: Int!, $studentId: String!) {
    connectSharedStudent(userId: $userId, studentId: $studentId) {
      ok
      error
    }
  }
`

const SharedStudentNotice = ({ userId }) => {
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
  return (<div>
    {/* <div onClick={() => onClickAcceptBtn(item.info)}>수락</div> */}
  </div>);
}

export default SharedStudentNotice;