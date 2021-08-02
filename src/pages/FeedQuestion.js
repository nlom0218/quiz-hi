import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import DetailContainer from '../components/Detail/DetailContainer';
import DetailLayout from '../components/Detail/DetailLayout';
import DetailQuestion from '../components/Detail/DetailQuestion';
import DetailTitle from '../components/Detail/DetailTitle';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import QuizQuestionBasket from '../components/QuizFeed/QuizQuestionBasket';

const DETAIL_QUESTION_QUERY = gql`
  query detailQuestion($id: Int!) {
    detailQuestion(id: $id) {
      id
      question
      distractor
      hint
      answer
      image
      createdAt
      likes
      isLiked
      hits
      type
      user {
        nickname
        avatarURL
        username
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
            <DetailLayout {...data?.detailQuestion} setPutQuiz={setPutQuiz}>
              <DetailQuestion {...data?.detailQuestion} setPutQuiz={setPutQuiz} />
            </DetailLayout>
            <QuizQuestionBasket setPutQuiz={setPutQuiz} />
          </DetailContainer>
        }
      </BasicContainer>
      <NavBtn />
    </React.Fragment>
  );
}

export default FeedQuestion;