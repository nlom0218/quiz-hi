import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
`

const Title = styled.div`
  font-size: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(200, 200, 200, 0.6);
  font-weight: 600;
`

const BasicInfo = styled.div`
  align-self: flex-start;
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .input {
    font-weight: 600;
  }
`

const DetailInto = styled.div`
  align-self: flex-start;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  background-color: blue;
`

const UserSite = styled.div`
  align-self: flex-start;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: green;
`

const BasicProfile = ({ data }) => {
  const { seeProfile: { nickname, email, totalFollow, totalFollowing, type, totalPublicQuiz, totalPublicQuestion } } = data
  console.log(type);
  return (<Container>
    <BasicInfo>
      <Title>기본정보</Title>
      <Wrapper>
        <div className="input">닉네임</div>
        <div className="value">{nickname}</div>
      </Wrapper>
      {type === "teacher" && <Wrapper>
        <div className="input">이메일</div>
        <div className="value">{email}</div>
      </Wrapper>}
      <Wrapper>
        <div className="input">팔로워</div>
        <div className="value">{totalFollow}</div>
      </Wrapper>
      <Wrapper>
        <div className="input">팔로잉</div>
        <div className="value">{totalFollowing}</div>
      </Wrapper>
      {type === "teacher" && <Wrapper>
        <div className="input">공유한 퀴즈</div>
        <div className="value">{totalPublicQuiz}</div>
      </Wrapper>}
      {type === "teacher" && <Wrapper>
        <div className="input">공유한 문제</div>
        <div className="value">{totalPublicQuestion}</div>
      </Wrapper>}
    </BasicInfo>
    <DetailInto>
      ff
    </DetailInto>
    <UserSite>
      ee
    </UserSite>
  </Container>);
}

export default BasicProfile;