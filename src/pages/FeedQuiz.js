import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import DetailContainer from '../components/Detail/DetailContainer';
import DetailLayout from '../components/Detail/DetailLayout';
import DetailQuiz from '../components/Detail/DetailQuiz';
import DetailTitle from '../components/Detail/DetailTitle';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import QuizQuestionBasket from '../components/QuizFeed/QuizQuestionBasket';
import useTitle from '../hooks/useTitle';

const DelQuizMsg = styled.div`
  color: tomato;
`

const DETAIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      createdAt
      caption
      order
      updateInfo
      likes
      isLiked
      hits
      updatedAt
      user {
        id
        nickname
        avatarURL
        username
      }
      tags {
        id
        name
      }
      questions {
        user {
          id
          nickname
          avatarURL
          username
        }
        question
        id
        type
        tags {
          id
          name
        }
        isLiked
        likes
        createdAt
        hits
      }
    } 
  }
`

const FeedQuiz = () => {
  const titleUpdataer = useTitle("QUIZ HI | 퀴즈")
  const { id } = useParams()
  const [putQuiz, setPutQuiz] = useState(false)
  const { data, loading } = useQuery(DETAIL_QUIZ_QUERY, { variables: { id: parseInt(id) } })
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        {loading ? <div>loading...</div> :
          <DetailContainer>
            <DetailTitle title="퀴즈" />
            {data?.detailQuiz === null ?
              <DelQuizMsg>작성자에 의해 삭제된 퀴즈입니다.</DelQuizMsg>
              :
              <DetailLayout {...data?.detailQuiz} setPutQuiz={setPutQuiz}>
                <DetailQuiz {...data?.detailQuiz} setPutQuiz={setPutQuiz} />
              </DetailLayout>}
            <QuizQuestionBasket setPutQuiz={setPutQuiz} />
          </DetailContainer>
        }
      </BasicContainer>
      <NavBtn />
    </React.Fragment>
  );
}

export default FeedQuiz;