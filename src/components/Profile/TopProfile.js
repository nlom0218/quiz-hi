import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { processUserLevel } from '../../sharedFn';
import LevelStep from '../LevelStep';
import FollowBtn from './FollowBtn';

const Container = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: auto 2fr 1fr 1fr;
  row-gap: 20px;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
`

const UserAvatar = styled.div`
  padding-left: 30px;
  align-self: center;
  justify-self: center;
  div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgb(200, 200, 200, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    font-size: 60px;
  }
`

const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: fill;
`

const UserBasicInfo = styled.div`
  padding-left: 30px;
  align-self: center;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const Nickname = styled.div`
  font-size: 18px;
  margin-right: 10px;
`

const UserType = styled.div`
  background-color: rgb(255, 165, 0, 0.6);
  padding: 5px 10px;
  border-radius: 5px;
`

const UserEmail = styled.div`
  margin-top: 10px;
`

const UserLevel = styled.div`
  align-self: center;
`

const UserCaption = styled.textarea`
  grid-column: 1 / -1;
  line-height: 20px;
  align-self: flex-start;
  justify-self: flex-start;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  padding: 0px;
  color: ${props => props.answer ? "tomato" : props.theme.fontColor};
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }
`

const ProfileNav = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background-color: rgb(220, 220, 220, 0.2);
`

const NavBtn = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.seleted ? "rgb(200, 200, 200, 0.4)" : ""};
    transition: background-color linear 0.5s;
    :hover {
      background-color: rgb(220, 220, 220, 0.6);
    }
`

const TopProfile = ({ data }) => {
  const textarea = useRef()
  const [txtHeight, setTxtHeight] = useState(null)
  useEffect(() => {
    if (caption) {
      setTxtHeight(textarea.current.scrollHeight)
    }
  }, [])
  const { seeProfile: { id, username, nickname, email, avatarURL, type, score, isMe, isFollow, caption } } = data
  const { mode } = useParams()
  const history = useHistory()
  const userType = () => {
    if (type == "teacher") {
      return "선생님"
    } else if (type == "student") {
      return "학생"
    } else if (type === "nomal") {
      return "일반인"
    }
  }
  const level = processUserLevel(score)
  const onClickNavBtn = (mode) => {
    if (mode === "quizQuestion") {
      history.push(`/profile/${username}/${mode}/public/quiz/1`)
    } else {
      history.push(`/profile/${username}/${mode}`)
    }
  }
  const studentMode = () => {
    if (!isMe) {
      return false
    }
    if (type === "teacher") {
      return true
    } else {
      return false
    }
  }
  return (<Container>
    <UserAvatar>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
    </UserAvatar>
    <UserBasicInfo>
      <Wrapper>
        <Nickname>{nickname}</Nickname>
        <UserType>{userType()}</UserType>
      </Wrapper>
      {email && <UserEmail>{email}</UserEmail>}
    </UserBasicInfo>
    <UserLevel>
      {/* <LevelStep level={level} /> */}
    </UserLevel>
    <FollowBtn isMe={isMe} isFollow={isFollow} username={username} id={id} />
    {caption && <UserCaption
      value={caption}
      readOnly="readOnly"
      rows={1}
      txtHeight={txtHeight}
      ref={textarea}
    >
    </UserCaption>}
    <ProfileNav>
      <NavBtn
        onClick={() => onClickNavBtn("info")}
        seleted={mode === "basic" ? true : false}>프로필</NavBtn>
      <NavBtn
        onClick={() => onClickNavBtn("quizQuestion")}
        seleted={mode === "quizQuestion" ? true : false}>퀴즈 & 문제</NavBtn>
      <NavBtn
        onClick={() => onClickNavBtn("board")}
        seleted={mode === "board" ? true : false}>게시물</NavBtn>
      {isMe &&
        <NavBtn onClick={() => onClickNavBtn("edit")}
          seleted={mode === "edit" ? true : false}>프로필 수정</NavBtn>}
      {isMe && <NavBtn
        onClick={() => onClickNavBtn("setting")}
        seleted={mode === "setting" ? true : false}>QUIZ HI 설정</NavBtn>}
      {studentMode() && <NavBtn
        onClick={() => onClickNavBtn("student")}
        seleted={mode === "student" ? true : false}>학생 관리</NavBtn>}
    </ProfileNav>

  </Container>);
}

export default TopProfile;