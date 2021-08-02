import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import DetailContainer from '../components/Detail/DetailContainer';
import DetailLayout from '../components/Detail/DetailLayout';
import DetailTitle from '../components/Detail/DetailTitle';
import Header from '../components/Header';
import QuizQuestionBasket from '../components/QuizFeed/QuizQuestionBasket';

const DETAIL_QUESTION_QUERY = gql`
  query detailQuestion($id: Int!) {
    detailQuestion(id: $id) {
      id
      question
      createdAt
      likes
      isLiked
      hits
      user {
        nickname
        avatarURL
      }
      tags {
        name
      }
    } 
  }
`

const FeedQuestion = () => {
  const { id } = useParams()
  const [putQuiz, setPutQuiz] = useState(false)
  const { data, loading } = useQuery(DETAIL_QUESTION_QUERY, { variables: { id: parseInt(id) } })
  useEffect(() => {
    return () => setPutQuiz(false)
  }, [])
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        {loading ? <div>loading...</div> :
          <DetailContainer>
            <DetailTitle title="문제" />
            <DetailLayout {...data?.detailQuestion}>
              {/* <DetailQuiz {...data?.detailQuiz} setPutQuiz={setPutQuiz} /> */}
            </DetailLayout>
            <QuizQuestionBasket setPutQuiz={setPutQuiz} />
          </DetailContainer>
        }
      </BasicContainer>
    </React.Fragment>
  );
}

export default FeedQuestion;