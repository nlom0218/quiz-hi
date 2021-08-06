import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import BasicContainer from '../components/BasicContainer';
import DeleteContainer from '../components/Delete/DeleteContainer';
import DeleteQuestion from '../components/Delete/DeleteQuestion';
import DeleteQuiz from '../components/Delete/DeleteQuiz';
import Header from '../components/Header';
import NavBtn from '../components/NavBtn';

const Contnaer = styled.div`
  grid-column: 2 / -2;
`

const Delete = () => {
  const { type } = useParams()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <Contnaer>
        <DeleteContainer />
        {/* {type === "quiz" && <DeleteQuiz />}
        {type === "question" && <DeleteQuestion />} */}
      </Contnaer>
    </BasicContainer>
    <NavBtn />
  </React.Fragment>);
}

export default Delete;