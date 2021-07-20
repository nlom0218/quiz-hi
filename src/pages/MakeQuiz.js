import React from 'react';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import useUser from '../hooks/useUser';

const MakeQuiz = () => {
  const user = useUser()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      Make Quiz
    </BasicContainer>
  </React.Fragment>);
}

export default MakeQuiz;