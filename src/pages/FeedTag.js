import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import DetailContainer from '../components/Detail/DetailContainer';
import DetailTitle from '../components/Detail/DetailTitle';
import FollowTag from '../components/Detail/FollowTag';
import TotalInfo from '../components/Detail/TotalInfo';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';
import TagContents from '../components/Detail/TagContents';
import useTitle from '../hooks/useTitle';

const SEE_TAG_QUERY = gql`
  query seeTag($id: Int!) {
    seeTag(id: $id) {
      id
      name
      totalFollowUsers
      totalQuestions
      totalQuizzes
      isFollow
    }
  }
`

const FeedTag = () => {
  const titleUpdataer = useTitle("QUIZ HI | 태그")
  const { id } = useParams()
  const { data, loading } = useQuery(SEE_TAG_QUERY, { variables: { id: parseInt(id) } })
  return (
    <React.Fragment>
      <Header />
      <BasicContainer>
        {loading ? <div>loading...</div> : <DetailContainer>
          <DetailTitle title={data?.seeTag?.name} />
          <FollowTag isFollow={data?.seeTag?.isFollow} id={parseInt(id)} />
          <TotalInfo {...data?.seeTag} />
          <TagContents {...data?.seeTag} />
        </DetailContainer>}
      </BasicContainer>
      <NavBtn />
    </React.Fragment>
  );
}

export default FeedTag;