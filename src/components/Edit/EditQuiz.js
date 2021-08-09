import { useQuery } from '@apollo/client';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faBookOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AddOrDisConnectQuestions from './AddOrDisConnectQuestions';
import AddQuestions from './AddQuestions';
import DisconnectQuestions from './DisconnectQuestions';
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

const DivisionLine = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background-color: rgb(200, 200, 200, 0.6);
  transition: background-color 1s ease;
`

const DETAIL_QUIZ_QUERY = gql`
  query detailQuiz($id: Int!) {
    detailQuiz(id: $id) {
      id
      title
      caption
      state
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
    {loading ? <div>Loading...</div> :
      <React.Fragment>
        <PageTitle>
          <div><FontAwesomeIcon icon={faEdit} />퀴즈 수정</div>
          <Link
            className="delBtn"
            to={{
              pathname: `/delete/quiz/${id}`,
              state: { userId: data.detailQuiz.user.id }
            }}><FontAwesomeIcon icon={faTrash} />퀴즈 삭제</Link>
        </PageTitle>
        <EditQuizForm {...data.detailQuiz} />
        <PageTitle style={{ marginTop: "40px" }}>
          <div><FontAwesomeIcon icon={faBookOpen} />문제 추가 & 삭제</div>
        </PageTitle>
        <AddOrDisConnectQuestions>
          <AddQuestions {...data.detailQuiz} />
          <DisconnectQuestions questions={data.detailQuiz.questions} />
        </AddOrDisConnectQuestions>
      </React.Fragment>
    }
  </Container>);
}

export default EditQuiz;