import { useMutation, useQuery } from '@apollo/client';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import QuizItem from "./QuizItem"

const SEE_FOLLOW_QUIZ_QUERY = gql`
  query seeFollowQuiz($id: Int!, $page: Int!) {
    seeFollowQuiz(id: $id, page: $page) {
      totalNum
      quiz {
      id
      title
      user {
        nickname
        avatarURL
        username
      }
      tags {
        id
        name
      }
      questionNum
      isLiked
      likes
      hits
      createdAt
      }
    }
  }
`

const LibraryContainer = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const TopBar = styled.div`
  margin-top: 30px;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 30px;
`

const ContentsNum = styled.div`
  grid-column: 1 / 2;
  align-self: flex-end;
  svg {
    margin-right: 10px;
  }
`

const PageBar = styled.div`
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

const QuizList = styled.div`
  grid-column: 1 / 2;
  align-self: flex-start;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`

const QuizLibrary = () => {
  const history = useHistory()
  const user = useUser()
  const { page, type } = useParams()
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
      id: user?.id,
      page: parseInt(page)
    },
    skip: Boolean(!user),
    onCompleted
  })
  const onClickPageBtn = (btn) => {
    if (btn === "pre") {
      if (parseInt(page) === 1) {
        return
      } else {
        history.push(`/library/${type}/${parseInt(page) - 1}`)
      }
    } else if (btn === "next") {
      if (lastPage === parseInt(page)) {
        return
      } else {
        history.push(`/library/${type}/${parseInt(page) + 1}`)
      }
    }
  }
  return (
    <LibraryContainer>
      {loading ? "loading..." :
        <React.Fragment>
          <TopBar>
            <ContentsNum>
              <FontAwesomeIcon icon={faBook} />{data?.seeFollowQuiz?.totalNum}개의 퀴즈
        </ContentsNum>
            <PageBar>
              <PageBarBtn firstPage={parseInt(page) === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
              <PageBarBtn lastPage={lastPage === parseInt(page)} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
            </PageBar>
          </TopBar>
          <QuizList>
            {
              data?.seeFollowQuiz?.quiz.map((item, index) => {
                return <QuizItem key={index} {...item} />
              })
            }
          </QuizList>
        </React.Fragment>
      }
    </LibraryContainer>);
}

export default QuizLibrary;