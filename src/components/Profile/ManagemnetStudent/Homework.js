import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import HomeworkItem from './HomeworkItem';

const Container = styled.div`
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  transition: border 1s ease;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const HomeworkLayout = styled.div`
  display: grid;
`

const HomeworkList = styled.div`
  display: grid;
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr auto;
  padding: 0px 20px;
  margin-bottom: 20px;
`

const Date = styled.div``

const Title = styled.div``

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const SEE_HOMEWORK_QUERY = gql`
  query seeHomework($userId: Int!, $type: String!) {
    seeHomework(userId: $userId, type: $type) {
      id
      createdAt
      title
    }
  }
`

const Homework = ({ id, type }) => {
  const { data, loading } = useQuery(SEE_HOMEWORK_QUERY, {
    variables: {
      userId: id,
      type
    },
    skip: !type || !id
  })
  console.log(data?.seeHomework?.createdAt);
  return (<Container>
    {loading ? "loading..." : (data?.seeHomework.length === 0 ? "숙제가 없습니다." :
      <HomeworkLayout>
        <Wrapper>
          <Date style={{ fontWeight: "600" }}>숙제 시작 일</Date>
          <Title style={{ fontWeight: "600" }}>퀴즈 제목</Title>
          <div style={{ fontWeight: "600" }}>세부 정보</div>
        </Wrapper>
        <DivisionLine></DivisionLine>
        <HomeworkList>
          {data?.seeHomework.map((item, index) => {
            return <HomeworkItem {...item} key={index} />
          })}
        </HomeworkList>
      </HomeworkLayout>)
    }
  </Container>);
}

export default Homework;