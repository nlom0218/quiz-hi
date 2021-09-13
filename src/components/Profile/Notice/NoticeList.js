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

const SNoticeList = styled.div`
  background-color: rgb(200, 200, 200, 0.4);
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.4);
`

const NoticeItem = styled.div`
  background-color: ${props => props.theme.boxColor};
  padding: 20px 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  column-gap: 20px;
  transition: 0.6s ease background-color;
  :hover {
    background-color: rgb(200, 200, 200, 0.4);
  }
  svg {
    justify-self: flex-end;
    cursor: pointer;
  }
`

const CreatedAt = styled.div``

const Sender = styled.div``

const Type = styled.div``

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
    <SNoticeList>
      {notice?.map((item, index) => {
        return <NoticeItem key={index}>
          <CreatedAt>{getCreatedDay(item.createdAt)}</CreatedAt>
          <Sender>{item.sender}</Sender>
          <Type>{processType(item.type)}</Type>
          <FontAwesomeIcon icon={faEnvelope} />
          {/* <div onClick={() => onClickAcceptBtn(item.info)}>수락</div> */}
        </NoticeItem>
      })}
    </SNoticeList>
  </Container>
  );
}

export default NoticeList;