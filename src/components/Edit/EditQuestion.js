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
    :hover {
      color: #f4f4f4;
      background-color: tomato;
    }
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
      updateInfo
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
  const { data, loading } = useQuery(DETAIL_QUESTION_QUERY, { variables: { id: parseInt(id) } })
  return (<Container>
    {loading ? <div>Loading...</div> :
      <React.Fragment>
        <PageTitle>
          <div><FontAwesomeIcon icon={faEdit} />문제 수정</div>
          <Link
            className="delBtn"
            to={{
              pathname: `/delete/question/${id}`,
              state: { userId: data.detailQuestion.user.id }
            }}
          ><FontAwesomeIcon icon={faTrash} />문제 삭제</Link>
        </PageTitle>
        <EditQuestionForm {...data.detailQuestion} />
      </React.Fragment>
    }
  </Container>);
}

export default EditQuestion;