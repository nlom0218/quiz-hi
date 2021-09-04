import React from 'react';
import styled from 'styled-components';

const SHomeworkSubmitBtn = styled.input`
  background-color: ${props => props.theme.blueColor};
  margin-left: 180px;
  padding: 10px;
  color: ${props => props.theme.bgColor};
  text-align: center;
  border-radius: 5px;
  opacity: ${props => props.disabled ? "0.6" : "1"};
  transition: opacity 0.6s ease, background-color 1s ease, color 1s ease;
  cursor: pointer;
`

const HomeworkSubmitBtn = ({ isValid }) => {
  return (<SHomeworkSubmitBtn value="제출하기" type="submit" disabled={!isValid} />);
}

export default HomeworkSubmitBtn;