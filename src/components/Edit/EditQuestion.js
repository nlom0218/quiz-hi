import { useQuery } from '@apollo/client';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .delBtn {
    font-size: 16px;
    color: tomato;
    border: 1px solid tomato;
    padding: 5px 10px;
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
    <PageTitle>
      <div><FontAwesomeIcon icon={faEdit} />문제 수정</div>
      <Link className="delBtn" to={`/delete/question/${id}`}><FontAwesomeIcon icon={faTrash} />문제 삭제</Link>
    </PageTitle>
    {loading ? <div>Loading...</div> : <EditQuestionForm {...data.detailQuestion} />}
  </Container>);
}

export default EditQuestion;