import React, { useEffect } from 'react';
import styled from 'styled-components';
import Title from './Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faPencilAlt, faPlay, faSearch, faSignInAlt, faSignOutAlt, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { faClipboard, faListAlt } from '@fortawesome/free-regular-svg-icons';
import { HomeContentsLayoutGsap } from '../../hooks/Gsap';
import { useHistory } from 'react-router';


const Layout = styled.div`
  grid-column: 1 / 13;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 400px;
`

const Box = styled.div`
  grid-row: 2 / 3;
  background-color: rgb(140, 255, 237, 0.2);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
`

const Wapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  justify-items: center;
  transition: background-color 0.3s linear;
  cursor: pointer;
  :hover {
    background-color: rgb(140, 255, 237, 0.6);
  }
`

const Icon = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  svg {
    font-size: 18px;
    margin: 0px 10px;
  }
`

const Description = styled.div`
  align-self: center;
`

const NavIcon = () => {
  const history = useHistory()
  const onClinkNav = (routes) => {
    history.push(`/${routes}`)
  }
  return (<Layout className="iconLayout">
    <HomeContentsLayoutGsap layout="iconLayout" />
    <Title title="Icons" msg="Navigation icons of QUIZ HI" left={false} />
    <Box>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faMoon} />
          <FontAwesomeIcon icon={faSun} />
        </Icon>
        <Description>다크모드, 라이트모드</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faSearch} />
        </Icon>
        <Description>퀴즈 검색하기</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faClipboard} />
        </Icon>
        <Description>퀴즈 대시보드</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faListAlt} />
        </Icon>
        <Description>게시판</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Icon>
        <Description>퀴즈 만들기</Description>
      </Wapper>
      <Wapper onClick={() => onClinkNav("play-quiz")}>
        <Icon>
          <FontAwesomeIcon icon={faPlay} />
        </Icon>
        <Description>퀴즈 진행하기</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faUser} />
        </Icon>
        <Description>프로필</Description>
      </Wapper>
      <Wapper>
        <Icon>
          <FontAwesomeIcon icon={faSignInAlt} />
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Icon>
        <Description>로그인 & 로그아웃</Description>
      </Wapper>
    </Box>
  </Layout>);
}

export default NavIcon;