import { faBell, faFile } from '@fortawesome/free-regular-svg-icons';
import { faImage, faListOl, faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import QuestionItem from '../QuizFeed/QuestionItem';

const Question = styled.div`
  margin-top: ${props => props.tags ? "10px" : "20px"};
  grid-column: 1 / -1;
  line-height: 20px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
`

const Answer = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  line-height: 20px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
`

const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 10px;
    align-self: flex-start;
  }
  .distractor {
    line-height: 20px;
    align-self: flex-start;
    justify-self: flex-start;
    background-color: ${props => props.answer && "rgb(255, 255, 28, 0.4)"};
  }
`

const Hint = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  line-height: 20px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
`

const Image = styled.div`
  margin-top: 20px;
  grid-column: 1 / -1;
  line-height: 20px;
  display: grid;
  grid-template-columns: 90px 1fr;
  .title, .content {
    align-self: flex-start;
  }
  .content {
    width: 100%;
  }
`

const QuestionList = styled.div`
  display: grid;
  grid-column: 1 / -1;
  grid-row: 7 / 8;
  grid-template-columns: 1fr;
  border-top: 1px solid rgb(200, 200, 200, 0.8);
  border-right: 1px solid rgb(200, 200, 200, 0.8);
  border-left: 1px solid rgb(200, 200, 200, 0.8);
`


const DetailQuestion = ({ question, tags, answer, type, distractor, hint, image }) => {
  const checkAnswer = (num) => {
    const answerArr = answer.split(",").map((item) => parseInt(item))
    const checked = answerArr.includes(num)
    if (checked) {
      return true
    } else {
      return false
    }
  }
  return (<React.Fragment>
    <Question tags={tags.length !== 0 ? true : false}>
      <div className="title"><FontAwesomeIcon icon={faFile} /> 문제</div>
      <div className="content">{question}</div>
    </Question>
    {type === "obj" &&
      <Answer>
        <div className="title"><FontAwesomeIcon icon={faListOl} /> 선택지</div>
        <div className="content">
          <DisTractorList>
            {distractor.split("//!@#").map((item, index) => {
              return <DisTractorItem key={index} answer={checkAnswer(index + 1) ? true : false}>
                <div className="num">{`${index + 1}번`}</div>
                <div className="distractor">{item}</div>
              </DisTractorItem>
            })}
          </DisTractorList>
        </div>
      </Answer>
    }
    <Answer>
      <div className="title"><FontAwesomeIcon icon={faBell} /> 정답</div>
      {type === "tf" ?
        <div className="content">{answer === "true" ? "○" : "✕"}</div>
        :
        <div className="content">{answer}</div>}
    </Answer>
    {hint && <Hint>
      <div className="title"><FontAwesomeIcon icon={faMagic} /> 힌트</div>
      <div className="content">{hint}</div>
    </Hint>}
    {image && <Image>
      <div className="title"><FontAwesomeIcon icon={faImage} /> 이미지</div>
      <img className="content" src={image} />
    </Image>}
  </React.Fragment>);
}

export default DetailQuestion;