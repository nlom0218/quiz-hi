import { useQuery } from '@apollo/client';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useHistory, useParams } from 'react-router';
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
  .navBtn {
    display: flex;
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
const PrePage = styled.div`
  font-size: 16px;
  border: 1px solid ${props => props.theme.fontColor};
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 400;
  transition: background-color 0.3s linear, color 0.6s linear;
  :hover {
    color: ${props => props.theme.bgColor};
    background-color: ${props => props.theme.fontColor};
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
  const history = useHistory()
  const { id } = useParams()
  const { data, loading } = useQuery(DETAIL_QUESTION_QUERY, { variables: { id: parseInt(id) } })
  const onClickPreBtn = () => {
    history.push(`/detail/question/${id}`)
    window.location.reload()
  }
  return (<Container>
    {loading ? <div>Loading...</div> :
      <React.Fragment>
        <PageTitle>
          <div><FontAwesomeIcon icon={faEdit} />문제 수정</div>
          <div className="navBtn">
            <PrePage onClick={onClickPreBtn}>이전페이지</PrePage>
            <Link
              className="delBtn"
              to={{
                pathname: `/delete/question/${id}`,
                state: { userId: data.detailQuestion.user.id }
              }}
            ><FontAwesomeIcon icon={faTrash} />문제 삭제</Link>
          </div>
        </PageTitle>
        <EditQuestionForm {...data.detailQuestion} />
      </React.Fragment>
    }
  </Container>);
}

export default EditQuestion;