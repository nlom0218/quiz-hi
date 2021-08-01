import { faHeart, faTags, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faComment, faHeart as faHeartRegular, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../sharedFn";
import { onClickQuestionBasketBtn, checkQuestionBasket } from "./basketFn"
import { useHistory } from 'react-router';

const SQuizItem = styled.div`
  padding: 20px;
  padding-bottom: ${props => props.tags && "15px"};
  border-bottom: 1px solid rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(2, auto);
  row-gap: 10px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const QuizTitle = styled.div`
  grid-column: 1 / 2;
  font-weight: 600;
`

const QuizBasketBtn = styled.div`
  grid-column: 2 / 3;
  cursor: pointer;
`

const QuizInfo = styled.div`
  grid-column: 1 / -1;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr auto;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const Username = styled.div`
  display: flex;
  align-items: flex-end;
  margin-right: 10px;
  cursor: pointer;
`

const AvatarImage = styled.img`
  margin-right: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
`

const QuestionNum = styled.div`
  margin-right: 10px;
`

const QuizLike = styled.div`
  margin-right: 10px;
  svg {
    color: ${props => props.isLiked ? "tomato" : props.theme.fontColor};
    margin-right: 5px;
    transition: color 1s ease;
  }
`

const QuizComment = styled.div`
   margin-right: 10px;
  svg {
    margin-right: 5px;
  }
`

const QuizCreatedAt = styled.div`
`

const QuizTags = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: flex-start;
  svg {
    grid-row: 1 / -1;
    margin-right: 5px;
  }
`

const QuizTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`

const QuizTag = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 10px;
  background-color: rgb(201, 102, 255, 0.2);
  border-radius: 5px;
`

const QuestionItem = (
  { id, question, user: { nickname, avatarURL, username }, tags, isLiked, likes, createdAt, hits, setPutQuiz }) => {
  const history = useHistory()
  const onClickUsername = () => {
    history.push(`/profile/${username}`)
  }
  return (<SQuizItem tags={tags.length !== 0 ? true : false}>
    <QuizTitle>{question}</QuizTitle>
    <QuizBasketBtn onClick={() => {
      onClickQuestionBasketBtn(question, id)
      setPutQuiz(prev => !prev)
    }}>
      <FontAwesomeIcon icon={checkQuestionBasket(question) ? faCheckSquare : faSquare} />
    </QuizBasketBtn>
    <QuizInfo>
      <Wrapper>
        <Username onClick={onClickUsername}>
          {avatarURL ?
            <AvatarImage src={avatarURL} /> :
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
          }
          {nickname}
        </Username>
        <QuizLike isLiked={isLiked}>
          <FontAwesomeIcon icon={isLiked ? faHeart : faHeartRegular} />
          {likes}
        </QuizLike>
        <QuizComment>
          <FontAwesomeIcon icon={faComment} />
          3
      </QuizComment>
        <QuizComment>
          조회수 {hits}
        </QuizComment>
      </Wrapper>
      <Wrapper>
        <QuizCreatedAt>
          {getCreatedDay(createdAt)}
        </QuizCreatedAt>
      </Wrapper>
    </QuizInfo>
    {tags.length !== 0 && <QuizTags>
      <FontAwesomeIcon icon={faTags} />
      <QuizTagList>
        {tags.map((item, index) => {
          return <React.Fragment key={index}>
            <QuizTag>{item.name}</QuizTag>
          </React.Fragment>
        })}
      </QuizTagList>
    </QuizTags>
    }
  </SQuizItem>);
}

export default QuestionItem;