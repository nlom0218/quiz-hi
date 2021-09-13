import { useMutation } from '@apollo/client';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import { compare, getCreatedDay } from '../../../sharedFn';

const Container = styled.div`
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const ContentsBox = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 20px;
  font-weight: 600;
  border-right: 1px solid rgb(200, 200, 200, 0.6);
  border-left: 1px solid rgb(200, 200, 200, 0.6);
  border-top: 1px solid rgb(200, 200, 200, 0.6);
  background-color: rgb(200, 200, 200, 0.2);
`

const SNoticeList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid rgb(200, 200, 200, 0.6);
`

const NoticeItem = styled.div`
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

const CONNECT_SHARED_STUDENT_MUTATION = gql`
  mutation connectSharedStudent($userId: Int!, $studentId: String!) {
    connectSharedStudent(userId: $userId, studentId: $studentId) {
      ok
      error
    }
  }
`

const NoticeList = ({ notice, userId }) => {
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
  const processType = (type) => {
    if (type === "sharedStudent") {
      return "학생 공유"
    }
  }
  return (<Container>
    <ContentsBox>
      <div>받은 날짜</div>
      <div>보낸이(닉네임)</div>
      <div>알림 주제</div>
      <div style={{ justifySelf: "flex-end" }}>확인</div>
    </ContentsBox>
    <SNoticeList>
      {notice?.map((item, index) => {
        return <NoticeItem key={index}>
          <CreatedAt>{getCreatedDay(item.createdAt)}</CreatedAt>
          <Sender>{item.sender}</Sender>
          <Type>{processType(item.type)}</Type>
          <FontAwesomeIcon icon={faEnvelope} />
          <DetailNotice>

          </DetailNotice>
          {/* <div onClick={() => onClickAcceptBtn(item.info)}>수락</div> */}
        </NoticeItem>
      })}
    </SNoticeList>
  </Container>
  );
}

export default NoticeList;