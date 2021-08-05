import React from 'react';
import styled from 'styled-components';
import PageTitle from '../PageTitle';

const Container = styled.div``

const DETAIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      createdAt
      caption
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

const EditQuiz = () => {
  return (<Container>
    <PageTitle title="퀴즈 수정하기" />
  </Container>);
}

export default EditQuiz;