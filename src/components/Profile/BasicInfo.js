import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 5 / -2;
  grid-row: 1 / 2;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 20px 20px;
`

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 10px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const Nickname = styled.div`
  font-size: 20px;
  margin-right: 10px;
`

const UserType = styled.div`
  background-color: rgb(255, 165, 0, 0.6);
  padding: 5px 10px;
  border-radius: 5px;
`

const UserEmail = styled.div``

const FollowBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-self: center;
  align-self: center;
  width: 150px;
  height: 30px;
  background-color: rgb(255, 165, 0, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color linear 0.4s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`

const Btn = styled.div``

const BasicInfo = ({ data }) => {
  const { seeProfile: { id, username, nickname, email, avatarURL, type, score, isMe, isFollow } } = data
  const userType = () => {
    if (type == "teacher") {
      return "선생님"
    } else if (type == "student") {
      return "학생"
    } else if (type === "nomal") {
      return "일반인"
    }
  }
  const sortFollow = () => {
    if (isFollow) {
      return true
    } else {
      return false
    }
  }
  return (<Container>
    <Info>
      <Wrapper>
        <Nickname>{nickname}</Nickname>
        <UserType>{userType()}</UserType>
      </Wrapper>
      {email && <UserEmail>{email}</UserEmail>}
    </Info>
    {isMe
      ?
      <FollowBtn>프로필 수정</FollowBtn>
      :
      sortFollow() ? <FollowBtn>팔로잉</FollowBtn> : <FollowBtn>팔로워</FollowBtn>
    }
  </Container>);
}

export default BasicInfo;