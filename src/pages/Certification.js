import { faBan, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
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
  grid-template-columns: 1fr 2fr;
  justify-items: center;
  align-content: center;
`

const WrongMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgb(255, 0, 0, 0.8);
  svg {
    font-size: 180px;
    margin-bottom: 30px;
  }
  .wrong_msg {
    font-size: 20px;
    font-weight: 500;
  }
`

const Link = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Box = styled.div``

const Certification = () => {
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <Layout>
        <Title title="Wrong Access" msg="You need a login in order to acces this page" left={true} />
        <Wrapper>
          <WrongMsg>
            <FontAwesomeIcon icon={faBan} />
            <div className="wrong_msg">로그인이 필요한 페이지입니다.</div>
          </WrongMsg>
          <Link>
            <Box>
              <LinkBtn route="login" text="로그인하기" />
            </Box>
            <Box>
              <LinkBtn route="create-account" text="회원가입하기" />
            </Box>
            <Box>
              <LinkBtn route="" text="홈으로 돌아가기" />
            </Box>
          </Link>
        </Wrapper>
      </Layout>
    </BasicContainer>
  </React.Fragment>);
}

export default Certification;