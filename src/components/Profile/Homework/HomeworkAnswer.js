import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ObjAnswerInput = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* justify-items: center; */
`

const ObjAnswerList = styled.div`
  svg {
    cursor: pointer;
  }
`

const TFAnswerInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`

const TFAnswerList = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 10px 0px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`

const SubAnswerInput = styled.input`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
`

const HomeworkAnswer = ({ type, questionNum, register }) => {
  const onClickAnswer = (num, answer) => { }
  return (<React.Fragment>
    {type === "obj" && <ObjAnswerInput>
      <ObjAnswerList>
        <FontAwesomeIcon icon={faCircle}
          onClick={() => onClickAnswer(questionNum, 1)}
        /> 1번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={faCircle}
          onClick={() => onClickAnswer(questionNum, 2)}
        /> 2번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={faCircle}
          onClick={() => onClickAnswer(questionNum, 3)}
        /> 3번
      </ObjAnswerList>
      <ObjAnswerList>
        <FontAwesomeIcon icon={faCircle}
          onClick={() => onClickAnswer(questionNum, 4)}
        /> 4번
      </ObjAnswerList>
    </ObjAnswerInput>}
    {type === "tf" && <TFAnswerInput>
      <TFAnswerList onClick={() => onClickAnswer(questionNum, true)}>○</TFAnswerList>
      <TFAnswerList onClick={() => onClickAnswer(questionNum, false)}>✕</TFAnswerList>
    </TFAnswerInput>}
    {type === "sub" &&
      <SubAnswerInput
        {...register(`answer${questionNum}`, { required: true })}
        type="text"
      />
    }
  </React.Fragment>);
}

export default HomeworkAnswer;