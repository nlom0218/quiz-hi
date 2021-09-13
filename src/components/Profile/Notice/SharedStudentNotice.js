import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import DetailNoticeContainer from './DetailNoticeContainer';

const ActionBtn = styled.div`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  div {
    text-align: center;
    color: #efefef;
    font-weight: 600;
    padding: 3px;
    border-radius: 5px;
    cursor: pointer;
    :nth-child(1) {
      background-color: ${props => props.theme.blueColor};
    }
    :nth-child(2) {
      background-color: tomato;
    }
  }
`

const CONNECT_SHARED_STUDENT_MUTATION = gql`
  mutation connectSharedStudent($userId: Int!, $studentId: String!) {
    connectSharedStudent(userId: $userId, studentId: $studentId) {
      ok
      error
    }
  }
`

const DELETE_NOTICE_MUTATION = gql`
  mutation deleteNotice($noticeId: Int!) {
    deleteNotice(noticeId: $noticeId) {
      ok
      error
    }
  }
`

const SharedStudentNotice = ({ userId, message, info, noticeId }) => {
  const onCompleted = (result) => {
    const { connectSharedStudent: { ok, error } } = result
    if (ok) {
      if (deleteLoading) {
        return
      }
      window.alert("학생 공유를 수락하였습니다. 공유된 학생은 프로필 > 학생 관리 > 학생 목록에서 확인 가능합니다. \n 알림은 삭제됩니다.")
      deleteNotice({
        variables: {
          noticeId
        }
      })
    }
  }
  const [connectSharedStudent, { loading }] = useMutation(CONNECT_SHARED_STUDENT_MUTATION, {
    onCompleted
  })
  const onCompletedDelete = (result) => {
    const { deleteNotice: { ok, error } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [deleteNotice, { loading: deleteLoading }] = useMutation(DELETE_NOTICE_MUTATION, {
    onCompleted: onCompletedDelete
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
  const onClickRefuseBtn = () => {
    if (deleteLoading) {
      return
    }
    window.alert("학생 공유를 거절하였습니다. 알림은 삭제됩니다.")
    deleteNotice({
      variables: {
        noticeId
      }
    })
  }
  return (<DetailNoticeContainer>
    {message}
    <ActionBtn>
      <div onClick={() => onClickAcceptBtn(info)}>수락</div>
      <div onClick={onClickRefuseBtn}>거절</div>
    </ActionBtn>
  </DetailNoticeContainer>);
}

export default SharedStudentNotice;