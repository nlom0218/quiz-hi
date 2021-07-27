import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const SMakeQuestionForm = styled.form`
  animation: ${fadeIn} 0.6s linear forwards;
`

const MakeQuestionForm = ({ children }) => {
  return (<SMakeQuestionForm>
    {children}
  </SMakeQuestionForm>);
}

export default MakeQuestionForm;