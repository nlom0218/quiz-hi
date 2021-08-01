import React from 'react';
import styled from 'styled-components';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { onClickResetBasket, removeBasketItem } from './basketFn';
import { faRedo, faShare, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeIn } from '../../animation/fade';


const SQuizQuestionBasket = styled.div`
  grid-column: 2 / 3;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
  /* border: 1px solid rgb(200, 200, 200, 0.8);
  padding: 10px; */
`

const QuizBasket = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const QuestionBasket = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const BasketName = styled.div`
  justify-self: flex-end;
  margin-bottom: 10px;
  svg {
    margin-left: 5px;
  }
`

const Wrapper = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 20px 10px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const BasketList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const BasketItem = styled.li`
  display: grid;
  grid-template-columns: 1fr auto;
  animation: ${fadeIn} 0.4s linear;
  font-size: 14px;
`

const ItemRemoveBtn = styled.div`
  cursor: pointer;
`

const BasketBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  svg {
    cursor: pointer;
  }
`

const QuizQuestionBasket = ({ setPutQuiz }) => {
  return (<SQuizQuestionBasket>
    <QuizBasket>
      <BasketName>퀴즈 장바구니<FontAwesomeIcon icon={faShoppingCart} /></BasketName>
      <Wrapper>
        {JSON.parse(localStorage.getItem("quizBasket")) && <BasketList>
          {JSON.parse(localStorage.getItem("quizBasket")).map((item, index) => {
            return <BasketItem key={index}>
              <div>{item.title.length > 10 ? `${item.title.substring(0, 9)}...` : item.title}</div>
              <ItemRemoveBtn
                onClick={() => {
                  removeBasketItem("quiz", item.title)
                  setPutQuiz(prev => !prev)
                }}
              ><FontAwesomeIcon icon={faTrashAlt} /></ItemRemoveBtn>
            </BasketItem>
          })}
        </BasketList>}
        <BasketBtn>
          <FontAwesomeIcon icon={faShare} />
          <FontAwesomeIcon icon={faRedo} onClick={() => {
            onClickResetBasket("quiz")
            setPutQuiz(prev => !prev)
          }} />
        </BasketBtn>
      </Wrapper>
    </QuizBasket>
    <QuestionBasket>
      <BasketName>문제 장바구니<FontAwesomeIcon icon={faShoppingCart} /></BasketName>
      <Wrapper>
        {JSON.parse(localStorage.getItem("questionBasket")) && <BasketList>
          {JSON.parse(localStorage.getItem("questionBasket")).map((item, index) => {
            return <BasketItem key={index}>
              <div>{item.question.length > 10 ? `${item.question.substring(0, 9)}...` : item.question}</div>
              <ItemRemoveBtn
                onClick={() => {
                  removeBasketItem("question", item.question)
                  setPutQuiz(prev => !prev)
                }}
              ><FontAwesomeIcon icon={faTrashAlt} /></ItemRemoveBtn>
            </BasketItem>
          })}
        </BasketList>}
        <BasketBtn>
          <FontAwesomeIcon icon={faShare} />
          <FontAwesomeIcon icon={faRedo} onClick={() => {
            onClickResetBasket("question")
            setPutQuiz(prev => !prev)
          }} />
        </BasketBtn>
      </Wrapper>
    </QuestionBasket>
  </SQuizQuestionBasket>);
}

export default QuizQuestionBasket;