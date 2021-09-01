import { useQuery } from '@apollo/client';
import { faCheckSquare, faFile, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import styled from 'styled-components';
import useUser from '../../../hooks/useUser';
import { compare, compareDesc } from '../../../sharedFn';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`

const Title = styled.div``

const SetOrder = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 30px;
  .order_msg, .order_reset {
    align-self: flex-end;
  } 
  .order_reset {
    padding: 5px 10px;
    background-color: rgb(255, 165, 0, 0.8);
    border-radius: 5px;
    cursor: pointer;
  }
`

const SetQuestion = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  padding: 20px 20px;
  border: 1px solid rgb(200, 200, 200, 0.8);
`

const Item = styled.div`
  font-weight: 600;
  line-height: 24px;
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  line-height: 24px;
`

const CheckBox = styled.div`
  align-self: flex-start;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  svg {
    cursor: pointer;
  }
`

const QuestionOrder = styled.div``

const SetQuestionOrder = ({ dataQuestions }) => {
  const [questions, setQuestions] = useState(dataQuestions)

  const onClickOrderCheckBox = (id) => {
    const orderArr = (questions.map((item) => {
      if (item.order) {
        return item.order
      } else {
        return 0
      }
    }))
    const maxOrder = orderArr.reduce((acc, cur) => (acc > cur ? acc : cur), 0)
    const question = questions.filter((item) => item.id === id)[0]
    if (!question.order) {
      const newQuestion = { ...question, order: (maxOrder ? maxOrder : 0) + 1 }
      const existQuestion = questions.filter((item) => item !== question)
      setQuestions([...existQuestion, newQuestion].sort(compareDesc("id")))
    } else {
      const newQuestion = { ...question, order: undefined }
      const existQuestion = questions.filter((item) => item !== question).map((item) => {
        if (item.order > question.order) {
          return { ...item, order: item.order - 1 }
        } else {
          return item
        }
      })
      setQuestions([...existQuestion, newQuestion].sort(compareDesc("id")))
    }
  }
  const onClickResetBtn = () => {
    const newQuestions = questions.map((item) => {
      return { ...item, order: undefined }
    })
    setQuestions(newQuestions)
  }

  return (<Container>
    <Wrapper>
      <Title>순서 정하기</Title>
      <SetOrder>
        <div className="order_msg">문제 순서대로 문제 옆 박스를 클릭해 주세요.</div>
        <div className="order_reset" onClick={onClickResetBtn}><FontAwesomeIcon icon={faRedoAlt} /> 초기화</div>
        {questions.map((item, index) => {
          return <SetQuestion key={index}>
            <Item><FontAwesomeIcon icon={faFile} /> 문제</Item>
            <Content>{item.question}</Content>
            <CheckBox>
              <QuestionOrder>{item.order ? `${item.order}번` : ""}</QuestionOrder>
              <FontAwesomeIcon icon={item.order ? faCheckSquare : faSquare} onClick={() => onClickOrderCheckBox(item.id)} />
            </CheckBox>
          </SetQuestion>
        })}
      </SetOrder>
    </Wrapper>
    <Wrapper>
      <Title>문제, 정답 미리보기</Title>
      ㅇㄴㄹㄴㅇㄹ
    </Wrapper>
  </Container>);
}

export default SetQuestionOrder;