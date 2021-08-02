import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../sharedFn"
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const SDetailQuiz = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  align-self: flex-start;
  border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
`

const Info = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  justify-self: flex-end;
  align-self: flex-start;
  display: flex;
`

const Likes = styled.div`
  margin-right: 20px;
  svg {
    margin-right: 10px;
    color: ${props => props.isLiked ? "tomato" : props.theme.fontColor};
    cursor: pointer;
  }
`

const Hits = styled.div``

const Title = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  font-size: 20px;
  line-height: 24px;
`

const UserProfile = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  align-items: flex-end;
`

const AvatarImage = styled.img`
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`

const CreatedAt = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
`

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($type: String!, $id: Int!) {
    toggleLike(type: $type, id: $id) {
      ok
      error
    }
  }
`

const DetailLayout = ({ id, children, title, user: { avatarURL, nickname }, createdAt, isLiked, likes, hits }) => {
  const update = (cache, result) => {
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
  }
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      type: "quiz",
      id
    },
    update
  })
  return (<SDetailQuiz>
    <Info>
      <Likes isLiked={isLiked}>
        <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} onClick={toggleLike} />
        {likes}
      </Likes>
      <Hits>
        조회수 {hits}
      </Hits>
    </Info>
    <Title>{title}</Title>
    <UserProfile>
      {avatarURL ?
        <AvatarImage src={avatarURL} /> :
        <div>
          <FontAwesomeIcon icon={faUser} />
        </div>
      }
      {nickname}
    </UserProfile>
    <CreatedAt>{getCreatedDay(createdAt)}</CreatedAt>
    {children}
  </SDetailQuiz>);
}


export default DetailLayout;