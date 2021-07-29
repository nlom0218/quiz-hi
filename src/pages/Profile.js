import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Route, Router, Switch, useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import BasicProfile from '../components/Profile/BasicProfile';
import BottomProfile from '../components/Profile/BottomProfile';
import TopProfile from '../components/Profile/TopProfile';

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      nickname
      email
      avatarURL
      type
      caption
      score
      isMe
      isFollow
      totalFollow
      totalFollowing
      totalPublicQuiz
      totalPublicQuestion
  }
}
`

const Profile = () => {
  const { username } = useParams()
  const [profileMode, setProfileMode] = useState("basic")
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, { variables: { username } })
  return (<React.Fragment>
    <Header />
    {loading ? <div>loading...</div> :
      <BasicContainer>
        <TopProfile data={{ ...data }} setProfileMode={setProfileMode} profileMode={profileMode} />
        {profileMode === "basic" && <BottomProfile><BasicProfile data={{ ...data }} /></BottomProfile>}
      </BasicContainer>
    }
    <NavBtn />
  </React.Fragment>);
}

export default Profile;