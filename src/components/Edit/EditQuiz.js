import { useQuery } from '@apollo/client';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EditQuizForm from './EditQuizForm';

const Container = styled.div`
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  row-gap: 30px;
 `

const PageTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  svg {
    margin-right: 10px;
  }
`
const DETAIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      caption
      user {
        id
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
  const { id } = useParams()
  const { data, loading } = useQuery(DETAIL_QUIZ_QUERY, { variables: { id: parseInt(id) } })
  return (<Container>
    <PageTitle><FontAwesomeIcon icon={faEdit} />퀴즈 수정</PageTitle>
    {loading ? <div>Loading...</div> : <EditQuizForm {...data.detailQuiz} />}
  </Container>);
}

export default EditQuiz;