import { faHeart, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faComment, faHeart as faHeartRegular, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../sharedFn";
import { onClickQuestionBasketBtn, checkQuestionBasket } from "./basketFn"
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const SQuestionItem = styled.div`
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
  font-weight: 600;
  cursor: pointer;
`

const QuizBasketBtn = styled.div`
  grid-column: 2 / 3;
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
`

const AvatarImage = styled.img`
  margin-right: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
`

const QuestionType = styled.div`
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

const QuestionItem = (
  { id, question, user: { nickname, avatarURL, username }, type, tags, isLiked, likes, createdAt, hits, setPutQuiz }) => {
  const history = useHistory()
  const onClickUsername = () => {
    history.push(`/profile/${username}`)
  }
  const onCompleted = (result) => {
    const { updateHit: { ok } } = result
    if (ok) {
      history.push(`/feed/question/${id}`)
    }
  }
  const update = (cache, result) => {
    const { data: { updateHit: { ok } } } = result
    if (ok) {
      const QuestionId = `Question:${id}`
      cache.modify({
        id: QuestionId,
        fields: {
          hits(prev) {
            return prev + 1
          }
        }
      })
    }
  }
  const [updateHit, { loading }] = useMutation(UPDATE_HIT_MUTATION, {
    onCompleted,
    update
  })
  const processType = (type) => {
    if (type === "sub") {
      return "주관식"
    } else if (type === "obj") {
      return "객관식"
    } else if (type === "tf") {
      return "○ / ✕"
    }
  }
  const onClickTitle = () => {
    if (loading) {
      return
    }
    updateHit({
      variables: {
        type: "question",
        id
      }
    })
  }
  return (<SQuestionItem tags={tags.length !== 0 ? true : false}>
    <QuizTitle onClick={onClickTitle}>
      {question.length > 45 ? `${question.substring(0, 44)}...` : question}
    </QuizTitle>
    <QuizBasketBtn onClick={() => {
      onClickQuestionBasketBtn(question, id)
      setPutQuiz(prev => !prev)
    }}>
      <FontAwesomeIcon icon={checkQuestionBasket(id) ? faCheckSquare : faSquare} />
    </QuizBasketBtn>
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
        <QuestionType>{processType(type)}</QuestionType>
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
            <QuizTag>{item.name}</QuizTag>
          </React.Fragment>
        })}
      </QuizTagList>
    </QuizTags>
    }
  </SQuestionItem>);
}

export default QuestionItem;