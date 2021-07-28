import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  background-color: ${props => props.bgColor};
  padding: 10px 20px;
  border-radius: 5px;
  color: ${props => props.theme.fontColor};
  transition: background-color 0.2s linear;
  :focus {
    background-color: ${props => props.fcBgColor};
    outline: none;
  }
`

const QuestionTextarea = ({ register, nextMode, bgColor, fcBgColor }) => {
  return (<Textarea
    cols={20}
    rows={3}
    {...register("question", {
      required: true
    })}
    readOnly={nextMode !== "" && "readOnly"}
    bgColor={bgColor}
    fcBgColor={fcBgColor}
  ></Textarea >);
}

export default QuestionTextarea;