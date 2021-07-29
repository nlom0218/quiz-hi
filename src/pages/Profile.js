import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import BasicInfo from '../components/Profile/BasicInfo';
import ProfileContainer from '../components/Profile/ProfileContainer';

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      email
      avatarURL
      type
      score
      isMe
  }
}
`

const Profile = () => {
  const { username } = useParams()
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, { variables: { username } })
  return (<React.Fragment>
    <Header />
    {loading ? <div>loading...</div> :
      <BasicContainer>
        <ProfileContainer data={{ ...data }} />
        <BasicInfo data={{ ...data }} />
      </BasicContainer>
    }
    <NavBtn />
  </React.Fragment>);
}

export default Profile;