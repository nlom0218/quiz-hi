import React from 'react';
import styled from 'styled-components';

const SHomeworkSubmitBtn = styled.div`
  background-color: ${props => props.theme.blueColor};
  margin-left: 180px;
  padding: 10px;
  color: ${props => props.theme.bgColor};
  text-align: center;
  border-radius: 5px;
  transition: opacity 0.6s ease, background-color 1s ease, color 1s ease;
  cursor: pointer;
`

const HomeworkSubmitBtn = ({ setSaveMsg }) => {
  const onClickHomeworkSubmit = () => {
    const homeworkScore = JSON.parse(localStorage.getItem("homeworkScore"))
    const answerArr = homeworkScore.map((item) => item.answer)
    if (answerArr.includes(undefined)) {
      setSaveMsg("정답을 입력하지 않은 문제가 있습니다.")
    } else {
      console.log("save");
    }
  }
  return (<SHomeworkSubmitBtn onClick={onClickHomeworkSubmit}>제출하기</SHomeworkSubmitBtn>);
}

export default HomeworkSubmitBtn;