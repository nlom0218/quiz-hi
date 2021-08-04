import { faHeart, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faComment, faHeart as faHeartRegular, faSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../sharedFn"
import { useHistory } from 'react-router';
import { onClickQuizBasketBtn, checkQuizBasket } from "./basketFn"
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useUser from '../../hooks/useUser';

const SQuizItem = styled.div`
  padding: 20px;
  padding-bottom: ${props => props.tags && "15px"};
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(2, auto);
  row-gap: 10px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const QuizTitle = styled.div`
  grid-column: 1 / 2;
  justify-self: flex-start;
  font-weight: 600;
  cursor: pointer;
`

const EditBasketBtn = styled.div`
  grid-column: 2 / 3;
  display: flex;
  align-items: flex-start;
`

const EditBtn = styled.div`
  margin-right: 20px;
  font-size: 14px;
  cursor: pointer;
`

const QuizBasketBtn = styled.div`
  cursor: pointer;
`

const QuizInfo = styled.div`
  grid-column: 1 / -1;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr auto;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const Username = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 10px;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
`

const AvatarImage = styled.img`
  margin-right: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
`

const QuestionNum = styled.div`
  margin-right: 10px;
`

const QuizLike = styled.div`
  margin-right: 10px;
  svg {
    color: ${props => props.isLiked ? "tomato" : props.theme.fontColor};
    margin-right: 5px;
    transition: color 1s ease;
  }
`

const QuizComment = styled.div`
   margin-right: 10px;
  svg {
    margin-right: 5px;
  }
`

const QuizCreatedAt = styled.div`
`

const QuizTags = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  svg {
    grid-row: 1 / -1;
    margin-right: 5px;
  }
`

const QuizTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`

const QuizTag = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 10px;
  background-color: rgb(201, 102, 255, 0.2);
  border-radius: 5px;
`

const UPDATE_HIT_MUTATION = gql`
  mutation updateHit($id: Int!, $type: String!) {
    updateHit(id: $id, type: $type) {
      ok
      error
    }
  }
`

const QuizItem = (
  { id, title, user: { nickname, avatarURL, username, id: userId }, tags, questionNum, isLiked, likes, createdAt, hits, setPutQuiz, edit }) => {
  const history = useHistory()
  const user = useUser()
  const onCompleted = (result) => {
    const { updateHit: { ok } } = result
    if (ok) {
      history.push(`/detail/quiz/${id}`)
    }
  }
  const update = (cache, result) => {
    const { data: { updateHit: { ok } } } = result
    if (ok) {
      const QuizId = `Quiz:${id}`
      cache.modify({
        id: QuizId,
        fields: {
          hits(prev) {
            return prev + 1
          }
        }
      })
    }
  }
  const [updateHit] = useMutation(UPDATE_HIT_MUTATION, {
    onCompleted,
    update,
    variables: {
      type: "quiz",
      id
    }
  })
  const onClickUsername = () => {
    history.push(`/profile/${username}`)
  }
  const onClickEditBtn = () => {
    if (userId !== user.id) {
      return
    } else {
      history.push(`/edit/quiz/${id}`)
    }
  }
  return (<SQuizItem tags={tags.length !== 0 ? true : false}>
    <QuizTitle onClick={updateHit}>
      {title.length > 40 ? `${title.substring(0, 40)}...` : title}
    </QuizTitle>
    <EditBasketBtn>
      {edit && <EditBtn onClick={onClickEditBtn}>
        <FontAwesomeIcon icon={faEdit} />
      </EditBtn>}
      <QuizBasketBtn onClick={() => {
        onClickQuizBasketBtn(title, id)
        setPutQuiz(prev => !prev)
      }}>
        <FontAwesomeIcon icon={checkQuizBasket(id) ? faCheckSquare : faSquare} />
      </QuizBasketBtn>
    </EditBasketBtn>
    <QuizInfo>
      <Wrapper>
        <Username onClick={onClickUsername}>
          {avatarURL ?
            <AvatarImage src={avatarURL} /> :
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
          }
          {nickname}
        </Username>
        <QuestionNum>{questionNum}문제</QuestionNum>
        <QuizLike isLiked={isLiked}>
          <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} />
          {likes}
        </QuizLike>
        <QuizComment>
          <FontAwesomeIcon icon={faComment} />
          3
      </QuizComment>
        <QuizComment>
          조회수 {hits}
        </QuizComment>
      </Wrapper>
      <Wrapper>
        <QuizCreatedAt>
          {getCreatedDay(createdAt)}
        </QuizCreatedAt>
      </Wrapper>
    </QuizInfo>
    {tags.length !== 0 && <QuizTags>
      <FontAwesomeIcon icon={faTags} />
      <QuizTagList>
        {tags.map((item, index) => {
          return <React.Fragment key={index}>
            <Link to={`/detail/tag/${item.id}`}><QuizTag>{item.name}</QuizTag></Link>
          </React.Fragment>
        })}
      </QuizTagList>
    </QuizTags>
    }
  </SQuizItem>);
}

export default QuizItem;