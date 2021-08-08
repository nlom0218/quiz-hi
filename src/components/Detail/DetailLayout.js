import { faHeart, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular, faCheckSquare, faSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../sharedFn"
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { checkQuestionBasket, checkQuizBasket, onClickQuestionBasketBtn, onClickQuizBasketBtn } from '../QuizFeed/basketFn';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const SDetailQuiz = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: flex-start;
  border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const Basket = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  align-self: flex-start;
  svg {
    margin-left: 10px;
    cursor: pointer;
  }
`

const Info = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / 2;
  justify-self: flex-end;
  align-self: flex-start;
  display: flex;
`

const EditBtn = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
`

const Likes = styled.div`
  svg {
    margin-right: 10px;
    transition: color 0.5s linear;
    color: ${props => props.isLiked ? "tomato" : props.theme.fontColor};
    cursor: pointer;
  }
`

const Hits = styled.div`
    margin-left: 20px;
`

const Title = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  font-size: 20px;
  line-height: 25px;
`

const UserProfile = styled.div`
  justify-self: flex-start;
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  svg {
    margin-right: 10px;
  }
`

const AvatarImage = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const CreatedAt = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  align-self: flex-end;
  justify-self: flex-end;
`

const Tags = styled.div`
  grid-column: 1 / -1;
  grid-row: 4 / 5;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  svg {
    grid-row: 1 / -1;
    margin-right: 5px;
  }
`

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`

const TagItem = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 10px;
  background-color: rgb(201, 102, 255, 0.2);
  border-radius: 5px;
`

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($type: String!, $id: Int!) {
    toggleLike(type: $type, id: $id) {
      ok
      error
    }
  }
`

const DetailLayout = ({ id, children, title, question, user: { avatarURL, nickname, username, id: userId }, createdAt, isLiked, likes, hits, tags, setPutQuiz }) => {
  const history = useHistory()
  const user = useUser()
  const processType = () => {
    if (title) {
      return "quiz"
    } else if (question) {
      return "question"
    }
  }
  const update = (cache, result) => {
    if (processType() === "quiz") {
      const { data: { toggleLike: { ok } } } = result
      const quizId = `Quiz:${id}`
      cache.modify({
        id: quizId,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            }
            return prev + 1
          }
        }
      })
    } else if (processType() === "question") {
      const { data: { toggleLike: { ok } } } = result
      const QuestionId = `Question:${id}`
      cache.modify({
        id: QuestionId,
        fields: {
          isLiked(prev) {
            return !prev
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1
            }
            return prev + 1
          }
        }
      })
    }
  }
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      type: processType(),
      id
    },
    update
  })
  const processTitle = () => {
    if (title) {
      return title
    } else if (question) {
      return question
    }
  }
  const onClickUsername = () => {
    history.push(`/profile/${username}/info`)
  }
  const onClickEditBtn = () => {
    if (userId !== user.id) {
      return
    } else if (title) {
      history.push(`/edit/quiz/${id}`)
    } else if (question) {
      history.push(`/edit/question/${id}`)
    }
  }
  return (<SDetailQuiz>
    <Basket>
      장바구니에 담기
      {title && <FontAwesomeIcon
        icon={checkQuizBasket(id) ? faCheckSquare : faSquare}
        onClick={() => {
          onClickQuizBasketBtn(title, id)
          setPutQuiz(prev => !prev)
        }}
      />}
      {question && <FontAwesomeIcon
        icon={checkQuestionBasket(id) ? faCheckSquare : faSquare}
        onClick={() => {
          onClickQuestionBasketBtn(question, id)
          setPutQuiz(prev => !prev)
        }}
      />}
    </Basket>
    <Info>
      <Likes isLiked={isLiked}>
        <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} onClick={toggleLike} />
        {likes}
      </Likes>
      <Hits>
        조회수 {hits}
      </Hits>
      {user.id === userId && <EditBtn onClick={onClickEditBtn}>
        <FontAwesomeIcon icon={faEdit} />
      </EditBtn>}
    </Info>
    <Title>{processTitle()}</Title>
    <UserProfile onClick={onClickUsername}>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
      {nickname}
    </UserProfile>
    <CreatedAt>{getCreatedDay(createdAt)}</CreatedAt>
    {tags.length !== 0 && <Tags>
      <FontAwesomeIcon icon={faTags} />
      <TagsList>
        {tags.map((item, index) => {
          return <React.Fragment key={index}>
            <Link to={`/detail/tag/${item.id}/quiz/recent/1`}> <TagItem>{item.name}</TagItem></Link>
          </React.Fragment>
        })}
      </TagsList>
    </Tags>
    }
    {children}
  </SDetailQuiz>);
}


export default DetailLayout;