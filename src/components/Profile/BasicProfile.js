import React from 'react';
import styled from 'styled-components';
import { processNextLevelScore, processUserLevel, getCreatedDay } from '../../sharedFn';
import LevelStep from '../LevelStep';

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
  display: grid;
  grid-template-columns: auto 1fr;
  .input {
    font-weight: 600;
  }
  .value {
    justify-self: flex-end;
    text-align: end;
  }
`

const DetailInto = styled.div`
  align-self: flex-start;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`

const UserLevel = styled.div`
  padding: 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
`

const LevelContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  margin-top: 20px;
`

const Level = styled.div`
  justify-self: center;
  align-self: center;
`

const LevelScore = styled.div`
  margin-left: 30px;
  justify-self: flex-start;
  align-self: center;
  .nextLevel {
    margin-top: 10px;
    color: tomato;
  }
`

const LevelRule = styled.div`
  align-self: center;
  padding: 10px 20px;
  background-color: rgb(255, 165, 0, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color linear 0.5s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`

const UserSite = styled.div`
  align-self: flex-start;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  background-color: green;
`

const BasicProfile = ({ data }) => {
  const { seeProfile: { nickname, email, totalFollow, totalFollowing, type, totalPublicQuiz, totalPublicQuestion, score, createdAt } } = data
  const level = processUserLevel(score)
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
        <div className="input">가입일</div>
        <div className="value">{getCreatedDay(createdAt)}</div>
      </Wrapper>
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
      <UserLevel>
        <Title>레벨</Title>
        <LevelContainer>
          <Level>
            <LevelStep level={level} />
          </Level>
          <LevelScore>
            <div>현재 점수: {score}점</div>
            <div className="nextLevel">
              {level === 10 ? "최고레벨입니다." : `다음 레벨까지 ${processNextLevelScore(level, score)}점 남았습니다.`}
            </div>
          </LevelScore>
          <LevelRule>
            레벨에 대해 알아보기
          </LevelRule>
        </LevelContainer>
      </UserLevel>
    </DetailInto>
    <UserSite>
      ee
    </UserSite>
  </Container>);
}

export default BasicProfile;