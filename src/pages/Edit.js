import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import BasicContainer from '../components/BasicContainer';
import EditQuestion from '../components/Edit/EditQuestion';
import EditQuiz from '../components/Edit/EditQuiz';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';

const Edit = () => {
  const { type } = useParams()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      {type === "quiz" && <EditQuiz />}
      {type === "question" && <EditQuestion />}
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Edit;