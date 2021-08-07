import React from 'react';
import styled from 'styled-components';
import DeleteAccount from './DeleteAccount';
import EditBasicInfo from './EditBasicInfo';
import EditPrivatePage from './EditPrivatePage';
import EidtPassword from './EidtPassword';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 360px 1fr;
  row-gap: 80px;
  .delAccount {
    color: tomato;
  }
`

const Title = styled.div`
  align-self: flex-start;
  font-weight: 600;
`

const EditProfile = ({ nickname, caption, avatarURL, id }) => {
  return (<Container>
    <Title>기본정보 수정</Title>
    <EditBasicInfo nickname={nickname} caption={caption} avatarURL={avatarURL} id={id} />
    <Title>개인 홈페이지 수정</Title>
    <EditPrivatePage />
    <Title>비밀번호 수정</Title>
    <EidtPassword />
    <Title className="delAccount">계정 삭제</Title>
    <DeleteAccount />
  </Container>);
}

export default EditProfile;