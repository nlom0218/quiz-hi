import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import ObjQuestion from '../MakeQuiz/ObjQuestion';
import SubQuestion from '../MakeQuiz/SubQuestion';
import TFQuestion from '../MakeQuiz/TFQuestion';
import EditInputLayout from './EditInputLayout';

const Container = styled.div``

const InputTitle = styled.div``

const SMakeQuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  row-gap: 60px;
  .addQuestionMsg {
    justify-self: center;
    color: tomato;
  }
`
const QuestionType = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-columns: auto 1fr;
  span {
    grid-column: 1 / -1;
    margin-bottom: 15px;
  }
`

const Types = styled.div`
   grid-column: 1 / -1;
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   justify-items: start;
   align-items: center;
   svg {
     margin-right: 10px;
     cursor: pointer;
   }
`

const AddQuestions = ({ state, tags, user: { nickname, avatarURL } }) => {
  const { id } = useParams()
  const [quizType, setQuizType] = useState("sub")
  const onClickType = (type) => {
    setQuizType(type)
  }
  return (<React.Fragment>
    <Container>
      <EditInputLayout>
        <InputTitle>퀴즈 문제 추가하기</InputTitle>
        <SMakeQuestionContainer>
          <QuestionType>
            <span>・ 문제 유형을 선택하세요.</span>
            <Types>
              <div>
                <FontAwesomeIcon
                  onClick={() => onClickType("sub")}
                  icon={quizType === "sub" ? faCheckCircle : faCircle}
                />주관식</div>
              <div>
                <FontAwesomeIcon
                  onClick={() => onClickType("obj")}
                  icon={quizType === "obj" ? faCheckCircle : faCircle}
                />객관식</div>
              <div>
                <FontAwesomeIcon
                  onClick={() => onClickType("tf")}
                  icon={quizType === "tf" ? faCheckCircle : faCircle}
                />○ / ✕</div>
            </Types>
          </QuestionType>
          {quizType === "sub"
            && <SubQuestion
              quizTags={tags.map((item) => item.name)}
              quizType={quizType}
              nextMode=""
              imageId="newImage"
              state={state}
              updata={true}
              quizId={parseInt(id)}
              nickname={nickname}
              avatarUR={avatarURL}
            />}
          {quizType === "obj"
            && <ObjQuestion
              quizTags={tags.map((item) => item.name)}
              quizType={quizType}
              nextMode=""
              imageId="newImage"
              state={state}
              updata={true}
              quizId={parseInt(id)}
              nickname={nickname}
              avatarUR={avatarURL}
            />}
          {quizType === "tf"
            && <TFQuestion
              quizTags={tags.map((item) => item.name)}
              quizType={quizType}
              nextMode=""
              imageId="newImage"
              state={state}
              updata={true}
              quizId={parseInt(id)}
              nickname={nickname}
              avatarUR={avatarURL}
            />}
          <div className="addQuestionMsg">문제는 퀴즈의 마지막 번호로 추가 됩니다.</div>
        </SMakeQuestionContainer>
      </EditInputLayout>
    </Container>
  </React.Fragment>);
}

export default AddQuestions;