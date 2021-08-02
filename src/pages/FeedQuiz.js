import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import DetailContainer from '../components/Detail/DetailContainer';
import DetailLayout from '../components/Detail/DetailLayout';
import DetailQuiz from '../components/Detail/DetailQuiz';
import DetailTitle from '../components/Detail/DetailTitle';
import Header from '../components/Header';

const DETAIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      title
      createdAt
      caption
      user {
        nickname
        avatarURL
      }
      tags {
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
  const { id } = useParams()
  const { data, loading } = useQuery(DETAIL_QUIZ_QUERY, { variables: { id: parseInt(id) } })
  console.log(data);
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        {loading ? <div>loading...</div> :
          <DetailContainer>
            <DetailTitle />
            <DetailLayout {...data?.detailQuiz}>
              <DetailQuiz {...data?.detailQuiz} />
            </DetailLayout>
          </DetailContainer>
        }
      </BasicContainer>
    </React.Fragment>
  );
}

export default FeedQuiz;