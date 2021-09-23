import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { FollowTitle } from "./sharedCss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div``

const SEE_FOLLOWER_QUERY = gql`
  query Query($userId: Int!, $page: Int!) {
    seeFollower(userId: $userId, page: $page) {
      username
    }
  }
`

const SeeFollower = ({ userId, totalFollower }) => {
  const [lastPage, setLastPage] = useState(1)
  const onCompleted = () => {
    if (totalFollower === 0) {
      setLastPage(1)
      return
    }
    if (Number.isInteger(totalFollower / 10)) {
      setLastPage(totalFollower / 10)
      return
    }
    const lastPage = Math.floor(totalFollower / 10) + 1
    setLastPage(lastPage)
  }
  console.log(lastPage);
  const [page, setPage] = useState(1)
  const { data, loading } = useQuery(SEE_FOLLOWER_QUERY, {
    variables: {
      userId,
      page: 1
    },
    skip: !userId,
    onCompleted
  })
  console.log(data);
  return (
    loading ? "" :
      <Container>
        <FollowTitle>
          <FontAwesomeIcon icon={faUserFriends} />
          <div>팔로우</div>
        </FollowTitle>
      </Container>
  );
}

export default SeeFollower;