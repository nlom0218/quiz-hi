import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Title from '../components/Home/Title';
import LinkBtn from '../components/LinkBtn';

const Layout = styled.div`
  grid-column: 1 / -1;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 400px;
`

const Wrapper = styled.div`
  background-color: rgb(146, 248, 185, 0.2);
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  justify-items: center;
  align-content: center;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
`

const WrongMsg = styled.div`
  color: rgb(255, 99, 80);
  svg {
    font-size: 180px;
  }
`

const Link = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Box = styled.div``

const NotFound = () => {
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <Layout>
        <Title title="Wrong Access" msg="로그인이 필요한 페이지거나 요청한 페이지를 찾을 수 없습니다." left={true} />
        <Wrapper>
          <WrongMsg>
            <FontAwesomeIcon icon={faBan} />
          </WrongMsg>
          <Link>
            <Box>
              <LinkBtn route="" text="홈으로 돌아가기" />
            </Box>
            <Box>
              <LinkBtn route="login" text="로그인하기" />
            </Box>
            <Box>
              <LinkBtn route="create-account" text="회원가입하기" />
            </Box>
          </Link>
        </Wrapper>
      </Layout>
    </BasicContainer>
  </React.Fragment>);
}

export default NotFound;