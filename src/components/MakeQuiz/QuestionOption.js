import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import ImageContainer from './ImageContainer';
import InputLayout from './InputLayout';
import TagContainer from './TagContainer';

const Option = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  animation: ${fadeIn} 1s linear forwards;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`

const QuestionOption = (
  { register, getValues, setValue, questionTags, setQuestionTags, previewImg, setPreviewImg, setImage, nextMode }
) => {
  return (<Option>
    <InputLayout>
      <span className="inputTitle">・ 힌트</span>
      <span className="subMsg">힌트가 있나요?</span>
      <span className="subMsg">아래에 힌트를 작성하세요.</span>
      <input
        {...register("hint")}
        type="text"
        readOnly={nextMode !== "" && "readOnly"}
        autoComplete="off"
      />
    </InputLayout>
    <Wrapper>
      <InputLayout>
        <ImageContainer
          previewImg={previewImg}
          setPreviewImg={setPreviewImg}
          setValue={setValue}
          register={register}
          setImage={setImage}
          nextMode={nextMode}
        />
      </InputLayout>
      <InputLayout>
        <TagContainer
          getValues={getValues}
          setValue={setValue}
          register={register}
          tags={questionTags}
          setTags={setQuestionTags}
          nextMode={nextMode}
          subMsg1="해당 문제에만 해당되는 태그가 있나요?"
          subMsg2="태그를 입력하고 + 버튼을 눌러주세요."
        />
      </InputLayout>
    </Wrapper>
  </Option>);
}

export default QuestionOption;