import { faListOl } from '@fortawesome/free-solid-svg-icons';
import { faBell, faFile, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const SPreviewList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;

`

const PreviewItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 30px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 30px 20px;
  .quizContent {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 30px;
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`

const Title = styled.div`
  font-weight: 600;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 10px;
    align-self: flex-start;
    margin-top: 5px;
  }
`

const DistractorContent = styled.div`
  align-self: flex-start;
  justify-self: flex-start;
  line-height: 24px;
  color: ${props => props.answer ? "tomato" : props.theme.fontColor};
`

const QuizSetting = styled.div`
  margin-left: 20px;
`

const PreviewList = ({ quizList, quizMode }) => {
  console.log(quizMode);
  const processAnswer = (answer) => {
    if (answer === "true") {
      return "○"
    } else if (answer === "false") {
      return "✕"
    } else {
      return answer
    }
  }
  return (<SPreviewList>
    {quizList.map((item, index) => {
      return <PreviewItem key={index}>
        <div className="quizContent">
          <Wrapper>
            <Title><FontAwesomeIcon icon={faFile} /> 문제 {item.order}</Title>
            <Content>{item.question}</Content>
          </Wrapper>
          {item.distractor && <Wrapper>
            <Title><FontAwesomeIcon icon={faListOl} /> 선택지</Title>
            <Content>
              {item.distractor.split("//!@#").map((distractor, index) => {
                return <DisTractorItem key={index}>
                  <div className="num">{`${index + 1}번`}</div>
                  <DistractorContent
                    answer={parseInt(item.answer) === index + 1 ? true : false}
                  >{distractor}</DistractorContent>
                </DisTractorItem>
              })}
            </Content>
          </Wrapper>}
          <Wrapper>
            <Title><FontAwesomeIcon icon={faBell} /> 정답</Title>
            <Content>{processAnswer(item.answer)}</Content>
          </Wrapper>
        </div>
        {quizMode === "goldenBell" && <QuizSetting className="quizSetting"><FontAwesomeIcon icon={faSquare} /></QuizSetting>}
        {quizMode === "score" && <QuizSetting className="quizSetting">점수</QuizSetting>}
        {quizMode === "cooperation" && <QuizSetting className="quizSetting">점수</QuizSetting>}
      </PreviewItem>
    })}
  </SPreviewList >);
}

export default PreviewList;