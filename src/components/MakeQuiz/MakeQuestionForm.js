import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const SMakeQuestionForm = styled.form`
  animation: ${fadeIn} 0.8s linear forwards;
`

const MakeQuestionForm = ({ children, onSubmit }) => {
  return (<SMakeQuestionForm onSubmit={onSubmit}>
    {children}
  </SMakeQuestionForm>);
}

export default MakeQuestionForm;