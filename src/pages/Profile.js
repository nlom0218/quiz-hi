import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import ProfileContainer from '../components/Profile&Me/ProfileContainer';
import useUser from '../hooks/useUser';

const Profile = () => {
  const { username } = useParams()
  console.log(username);
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <ProfileContainer />
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Profile;