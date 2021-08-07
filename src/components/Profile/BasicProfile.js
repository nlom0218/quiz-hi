import { faInfoCircle, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { processNextLevelScore, processUserLevel, getCreatedDay } from '../../sharedFn';
import LevelStep from '../LevelStep';
import PopularQuizQuiestion from './PopularQuizQuiestion';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr;
  grid-gap: 20px;
`

const Title = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(200, 200, 200, 0.6);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`

const BasicInfo = styled.div`
  align-self: flex-start;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
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
  grid-row: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: flex-start;
`

const DetailInfoLayout = styled.div`
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

const TagContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-top: 20px;
`

const TagsNum = styled.div`
  font-weight: 400;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`

const Tag = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 10px;
  background-color: rgb(201, 102, 255, 0.2);
  border-radius: 5px;
`

const UserSite = styled.div`
  align-self: flex-start;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background-color: green;
`

const BasicProfile = ({ data }) => {
  const { seeProfile: {
    id,
    nickname,
    email,
    totalFollow,
    totalFollowing,
    type,
    totalPublicQuiz,
    totalPublicQuestion,
    score,
    createdAt,
    tags
  } } = data
  const level = processUserLevel(score)
  const processPopular = () => {
    if (totalPublicQuiz === 0 && totalPublicQuestion === 0) {
      return false
    } else {
      return true
    }
  }
  return (<Container>
    <BasicInfo>
      <Title><div><FontAwesomeIcon icon={faInfoCircle} /> 기본정보</div></Title>
      <Wrapper>
        <div className="input">닉네임</div>
        <div className="value">{nickname.length > 10 ? `${nickname.substring(0, 10)}...` : nickname}</div>
      </Wrapper>
      {type === "teacher" && <Wrapper>
        <div className="input">이메일</div>
        <div className="value">{email.length > 20 ? `${email.substring(0, 20)}...` : email}</div>
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
      <DetailInfoLayout>
        <Title>Lv 레벨</Title>
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
      </DetailInfoLayout>
      {tags.length !== 0 && <DetailInfoLayout>
        <Title>
          <div><FontAwesomeIcon icon={faTags} /> 팔로우 태그</div>
          <TagsNum>{tags.length}개의 팔로우 태그</TagsNum>
        </Title>
        <TagContainer>
          <TagList>
            {tags.map((item, index) => {
              return <React.Fragment key={index}>
                <Link to={`/detail/tag/${item.id}/quiz/recent/1`}><Tag>{item.name}</Tag></Link>
              </React.Fragment>
            })}
          </TagList>
        </TagContainer>
      </DetailInfoLayout>}
      {processPopular() && <PopularQuizQuiestion userId={id} />}
    </DetailInto>
    <UserSite>
      ee
    </UserSite>
  </Container>);
}

export default BasicProfile;