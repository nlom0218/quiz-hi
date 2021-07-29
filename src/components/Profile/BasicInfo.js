import React from 'react';
import styled from 'styled-components';
import FollowBtn from './FollowBtn';

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
  return (<Container>
    <Info>
      <Wrapper>
        <Nickname>{nickname}</Nickname>
        <UserType>{userType()}</UserType>
      </Wrapper>
      {email && <UserEmail>{email}</UserEmail>}
    </Info>
    <FollowBtn isMe={isMe} isFollow={isFollow} username={username} id={id} />
  </Container>);
}

export default BasicInfo;