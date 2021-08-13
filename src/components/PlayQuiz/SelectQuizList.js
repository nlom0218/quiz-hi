import { useQuery } from '@apollo/client';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';
import PageBar from '../QuizFeed/PageBar';

const Container = styled.div`
  animation: ${fadeIn} 0.6s ease;
`

const Wrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
`

const ContainerTitle = styled.div`
  align-self: flex-end;
`
const SPageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
`

const PageBarBtn = styled.div`
  padding: 8px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.firstPage ? "0.4" : "1"};
    cursor: ${props => props.firstPage ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
    opacity: ${props => props.lastPage ? "0.4" : "1"};
    cursor: ${props => props.lastPage ? "not-allowd" : "pointer"};
  }
`

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const Item = styled.li`
  padding: 20px 20px;
  padding-bottom: ${props => props.tags && "15px"};
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr auto;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const QuizTitle = styled.div`
  align-self: center;
`

const SeleteQuizBtn = styled.div`
  align-self: flex-start;
  background-color: rgb(255, 165, 0, 0.4);
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color linear 0.5s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`

const SEE_FOLLOW_QUIZ_QUERY = gql`
  query seeFollowQuiz($id: Int!, $page: Int!) {
    seeFollowQuiz(id: $id, page: $page) {
      quiz {
        title
      }
      totalNum
    }
  }
`

const SelectQuizList = () => {
  const user = useUser()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const onCompleted = (data) => {
    if (data.seeFollowQuiz.totalNum === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(data.seeFollowQuiz.totalNum / 10)) {
      setLastPage(data.seeFollowQuiz.totalNum / 10)
      return
    }
    const lastPage = Math.floor(data.seeFollowQuiz.totalNum / 10) + 1
    setLastPage(lastPage)
  }
  const { data, loading } = useQuery(SEE_FOLLOW_QUIZ_QUERY, {
    variables: {
      id: user.id,
      page
    },
    onCompleted
  })
  const onClickPageBtn = (btn) => {
    if (btn === "pre") {
      if (page === 1) {
        return
      }
      setPage(prev => prev - 1)
    } else {
      if (page === lastPage) {
        return
      }
      setPage(prev => prev + 1)
    }
  }
  return (<Container>
    <Wrapper>
      <ContainerTitle>라이브러리에 저장된 퀴즈</ContainerTitle>
      <SPageBar>
        <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
        <PageBarBtn lastPage={lastPage === page} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
      </SPageBar>
    </Wrapper>
    {loading ? <div>로딩중...</div> :
      <List>
        {data?.seeFollowQuiz?.quiz.map((item, index) => {
          return <React.Fragment key={index}>
            <Item>
              <QuizTitle>{item.title.length > 35 ? `${item.title.substring(0, 35)}...` : item.title}</QuizTitle>
              <SeleteQuizBtn>선택</SeleteQuizBtn>
            </Item>
          </React.Fragment>
        })}
      </List>}
  </Container>);
}

export default SelectQuizList;