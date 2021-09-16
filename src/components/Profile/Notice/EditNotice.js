import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { ActionBtn } from './ActionBtn';
import DetailNoticeContainer from './DetailNoticeContainer';

const Contents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const DELETE_NOTICE_MUTATION = gql`
  mutation deleteNotice($noticeId: Int!) {
    deleteNotice(noticeId: $noticeId) {
      ok
      error
    }
  }
`

const EditNotice = ({ message, info, noticeId }) => {
  const infoArr = JSON.parse(info)
  const editInfo = infoArr.map((item) => item.editInfo).filter((item) => item)[0]
  const quizQuestionId = infoArr.map((item) => item.id).filter((item) => item)[0]
  const onCompletedDelete = (result) => {
    const { deleteNotice: { ok, error } } = result
    if (ok) {
      window.location.reload()
    }
  }
  const [deleteNotice, { loading: deleteLoading }] = useMutation(DELETE_NOTICE_MUTATION, {
    onCompleted: onCompletedDelete
  })
  const onClickDeleteBtn = () => {
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
    <Contents>
      <div>{message}</div>
      <div>{editInfo}</div>
    </Contents>
    <ActionBtn>
      <div>퀴즈 / 문제 바로가기</div>
      <div onClick={onClickDeleteBtn}>삭제하기</div>
    </ActionBtn>
  </DetailNoticeContainer>);
}

export default EditNotice;