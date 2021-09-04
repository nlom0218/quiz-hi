import { faBell, faFile, faImage } from '@fortawesome/free-regular-svg-icons';
import { faListOl, faMagic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import HomeworkAnswer from './HomeworkAnswer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
`

const QuestionNum = styled.div`
  align-self: flex-start;
  display: grid;
  svg {
    margin-right: 10px;
  }
`

const QeustionBox = styled.div`
  background-color: ${props => props.theme.boxColor};
  padding: 30px;
  border-radius: 5px;
  box-shadow: ${props => props.theme.boxShadow};
  display: grid;
  grid-template-columns: 1fr 100px;
  row-gap: 40px;
  transition: background-color 1s ease;
`

const QuestionScore = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  justify-self: flex-end;
  color: ${props => props.theme.blueColor};
  transition: color 1s ease;
  font-weight: 600;
`

const Wrapper = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 100px 1fr;
  line-height: 20px;
  .imgBox {
    width: 100%;
  }
`

const WrapperForm = styled.form`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 100px 1fr;
  line-height: 20px;
`


const DisTractorList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 26px;
`

const DisTractorItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  .num {
    margin-right: 26px;
    align-self: flex-start;
  }
`

const Distractor = styled.div`
  align-self: flex-start;
  justify-self: flex-start;
`

const HomeworkQuizItem = ({ question, index }) => {
  const { register } = useForm()
  return (<Container>
    <QuestionNum>
      {index + 1}번 문제
    </QuestionNum>
    <QeustionBox>
      <Wrapper>
        <div><FontAwesomeIcon icon={faFile} /> 문제</div>
        <div>{question.question}</div>
      </Wrapper>
      {question.image && <Wrapper>
        <div><FontAwesomeIcon icon={faImage} /> 이미지</div>
        <img className="imgBox" src={question.image} />
      </Wrapper>}
      {question.type === "obj" &&
        <Wrapper>
          <div><FontAwesomeIcon icon={faListOl} /> 선택지</div>
          <DisTractorList>
            {question.distractor.split("//!@#").map((item, index) => {
              return <DisTractorItem key={index}>
                <div className="num">{`${index + 1}번`}</div>
                <Distractor>{item}</Distractor>
              </DisTractorItem>
            })}
          </DisTractorList>
        </Wrapper>
      }
      {question.hint && <Wrapper>
        <div><FontAwesomeIcon icon={faMagic} /> 힌트</div>
        <div>{question.hint}</div>
      </Wrapper>}
      <WrapperForm>
        <div><FontAwesomeIcon icon={faBell} /> 정답</div>
        <HomeworkAnswer type={question.type} questionNum={index + 1} register={register} />
      </WrapperForm>
      <QuestionScore>{question.score} 점</QuestionScore>
    </QeustionBox>
  </Container>);
}

export default HomeworkQuizItem;