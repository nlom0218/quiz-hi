import { useQuery } from '@apollo/client';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import EditQuestionForm from './EditQuestionForm';

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

const DETAIL_QUESTION_QUERY = gql`
  query detailQuestion($id: Int!) {
    detailQuestion(id: $id) {
      id
      question
      distractor
      hint
      answer
      image
      type
      user {
        id
      }
      tags {
        id
        name
      }
    } 
  }
`

const EditQuestion = () => {
  const { id } = useParams()
  const user = useUser()
  const { data, loading } = useQuery(DETAIL_QUESTION_QUERY, { variables: { id: parseInt(id) } })
  return (<Container>
    <PageTitle><FontAwesomeIcon icon={faEdit} />문제 수정</PageTitle>
    {loading ? <div>Loading...</div> : <EditQuestionForm {...data.detailQuestion} />}
  </Container>);
}

export default EditQuestion;