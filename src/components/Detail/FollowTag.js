import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';

const SFollowTag = styled.div`
  grid-column: 2 / 3;
  justify-self: flex-end;
`

const FollowBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color: rgb(255, 165, 0, 0.4);
    border-radius: 5px;
    cursor: pointer;
    transition: background-color linear 0.5s;
    :hover {
      background-color: rgb(255, 165, 0, 0.8);
    }
`

const TOGGLE_FOLLOW_TAG_MUTATION = gql`
  mutation toggleFollowTag($id: Int!) {
    toggleFollowTag(id: $id) {
      ok
      error
      msg
    }
  }
`

const FollowTag = ({ isFollow, id }) => {
  const user = useUser()
  const update = (cache, result) => {
    const { data: { toggleFollowTag: { ok, msg } } } = result
    console.log(msg);
    if (!ok) {
      return
    }
    if (ok) {
      const userId = `User:${user.id}`
      const tagId = `Tag:${parseInt(id)}`
      cache.modify({
        id: userId,
        fields: {
          totalFollowTags(prev) {
            if (msg === "unfollow") {
              return prev - 1
            } else if (msg === "follow") {
              return prev + 1
            }
          }
        }
      })
      cache.modify({
        id: tagId,
        fields: {
          totalFollowUsers(prev) {
            if (msg === "unfollow") {
              return prev - 1
            } else if (msg === "follow") {
              return prev + 1
            }
          },
          isFollow(prev) { return !prev }
        }
      })
    }
  }
  const [toggleFollowTag, { loading }] = useMutation(TOGGLE_FOLLOW_TAG_MUTATION, {
    variables: { id: parseInt(id) },
    update
  })
  return (
    <SFollowTag>
      <FollowBtn onClick={toggleFollowTag}>
        {isFollow ? "팔로잉" : "팔로우"}
      </FollowBtn>
    </SFollowTag>
  );
}

export default FollowTag;