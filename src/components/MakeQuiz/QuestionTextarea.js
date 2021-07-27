import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  background-color: rgb(247, 171, 96, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
  color: ${props => props.theme.fontColor};
  transition: background-color 0.2s linear;
  :focus {
    background-color: rgb(247, 171, 96, 0.4);
    outline: none;
  }
`

const QuestionTextarea = ({ register }) => {
  return (<Textarea cols={20} rows={5} {...register("question", { required: true })}></Textarea>);
}

export default QuestionTextarea;