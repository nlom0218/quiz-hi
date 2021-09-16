import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory } from 'react-router';
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

const ChargeNotice = ({ message, info, noticeId }) => {
  const history = useHistory()
  const infoArr = JSON.parse(info)
  const chargeInfo = infoArr.map((item) => item.chargeInfo).filter((item) => item)[0]
  const type = infoArr.map((item) => item.type).filter((item) => item)[0]
  const quizQuestionId = infoArr.map((item) => item.id).filter((item) => item)[0]
  console.log(type);
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
    window.alert("알림이 삭제됩니다.")
    deleteNotice({
      variables: {
        noticeId
      }
    })
  }
  const onClickNavBtn = () => {
    history.push(`/detail/${type}/${quizQuestionId}`)
  }
  return (<DetailNoticeContainer>
    <Contents>
      <div>{message}</div>
      <div>{chargeInfo}</div>
    </Contents>
    <ActionBtn>
      <div onClick={onClickNavBtn}>{type === "quiz" ? "퀴즈" : "문제"} 바로가기</div>
      <div onClick={onClickDeleteBtn}>삭제하기</div>
    </ActionBtn>
  </DetailNoticeContainer>);
}

export default ChargeNotice;