import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import BasicProfile from '../components/Profile/BasicProfile';
import BottomProfile from '../components/Profile/BottomProfile';
import EditProfile from '../components/Profile/Edit/EditProfile';
import StudentHomework from '../components/Profile/Homework/StudentHomework';
import ManagemnetStudent from '../components/Profile/ManagemnetStudent/ManagemnetStudent';
import QuizHiSetting from '../components/Profile/QuizHiSetting/QuizHiSetting';
import TopProfile from '../components/Profile/TopProfile';
import UserQuizQuestion from '../components/Profile/UserQuizQuestion/UserQuizQuestion';
import StudentHeader from '../components/StudentHeader';
import useUser from '../hooks/useUser';

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
      personalPage
      score
      quizScore
      firstPage
      fontFamily
      goldenbellScore
      cooperationScore
      isMe
      isFollow
      totalFollow
      totalFollowing
      totalPublicQuiz
      totalPublicQuestion
      totalPrivateQuiz
      totalPrivateQuestion
      createdAt
      tags {
        id
        name
      }
      students {
        id
        nickname
        username
        avatarURL
        score
        quizScore
      }
    }
  }
`

const Profile = () => {
  const { username, mode, quizId, state } = useParams()
  const user = useUser()
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, { variables: { username } })
  return (<React.Fragment>
    {user?.type !== "student" ? <Header /> : <StudentHeader />}
    <BasicContainer>
      {loading ? <div>loading...</div> :
        <React.Fragment>
          <TopProfile data={{ ...data }} />
          {mode === "info" && <BottomProfile><BasicProfile data={{ ...data }} /></BottomProfile>}
          {mode === "quizQuestion" && <BottomProfile><UserQuizQuestion data={{ ...data }} /></BottomProfile>}
          {mode === "edit" && <BottomProfile>
            {user?.username === username && <EditProfile {...data?.seeProfile} />}
          </BottomProfile>}
          {mode === "setting" && <BottomProfile>
            {user?.username === username && <QuizHiSetting {...data?.seeProfile} />}
          </BottomProfile>}
          {mode === "student" && <BottomProfile>
            {user?.username === username && <ManagemnetStudent {...data?.seeProfile} />}
          </BottomProfile>}
          {mode === "homework" && <BottomProfile>
            {user?.username === username && <StudentHomework {...data?.seeProfile} quizId={quizId} state={state} />}
          </BottomProfile>}
        </React.Fragment>
      }
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Profile;