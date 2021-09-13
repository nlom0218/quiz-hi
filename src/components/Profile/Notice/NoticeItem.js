import React, { useState } from 'react';
import styled from 'styled-components';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCreatedDay } from '../../../sharedFn';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SharedStudentNotice from './SharedStudentNotice';

const SNoticeItem = styled.div`
  :not(:last-child) {
    border-bottom: 1px solid rgb(200, 200, 200, 0.6);
  }
  background-color: ${props => props.theme.boxColor};
  padding: 20px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 20px;
  transition: 0.6s ease background-color;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  svg {
    justify-self: flex-end;
    cursor: pointer;
  }
`

const CreatedAt = styled.div``

const Sender = styled.div``

const Type = styled.div``

const DetailNotice = styled.div`
  grid-column: 1 / -1;
`

const CONFIRM_NOTICE_MUTATION = gql`
  mutation confirmNotice($noticeId: Int!, $userId: Int!) {
    confirmNotice(noticeId: $noticeId, userId: $userId) {
      ok
      error
    } 
  }
`



const NoticeItem = ({ createdAt, sender, type, confirm, userId, id }) => {
  const [seeDetail, setSeeDetail] = useState(false)
  const processType = (type) => {
    if (type === "sharedStudent") {
      return "학생 공유"
    }
  }
  const [confirmNotice] = useMutation(CONFIRM_NOTICE_MUTATION)
  const onClickConfirmBtn = (noticeId, confirm) => {
    if (confirm) {
      setSeeDetail(prev => !prev)
      return
    }
    setSeeDetail(true)
    confirmNotice({
      variables: {
        noticeId,
        userId
      }
    })
  }
  return (<SNoticeItem>
    <CreatedAt>{getCreatedDay(createdAt)}</CreatedAt>
    <Sender>{sender}</Sender>
    <Type>{processType(type)}</Type>
    <FontAwesomeIcon icon={confirm ? faEnvelopeOpen : faEnvelope} onClick={() => onClickConfirmBtn(id, confirm)} />
    <DetailNotice>
      {type === "sharedStudent" && <SharedStudentNotice userId={userId} />}
    </DetailNotice>
  </SNoticeItem>);
}

export default NoticeItem;