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
  { register, getValues, setValue, questionTags, setQuestionTags, setImage, nextMode, imageId, previewImg, setPreviewImg }
) => {
  return (<Option>
    <InputLayout bgColor="rgb(172, 255, 20, 0.2)" fcBgColor="rgb(172, 255, 20, 0.4)">
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
          setValue={setValue}
          register={register}
          setImage={setImage}
          nextMode={nextMode}
          imageId={imageId}
          previewImg={previewImg}
          setPreviewImg={setPreviewImg}
          bgColor="rgb(172, 255, 20, 0.2)"
          hvBgColor="rgb(172, 255, 20, 0.4)"
        />
      </InputLayout>
      <InputLayout bgColor="rgb(172, 255, 20, 0.2)" fcBgColor="rgb(172, 255, 20, 0.4)">
        <TagContainer
          getValues={getValues}
          setValue={setValue}
          register={register}
          tags={questionTags}
          setTags={setQuestionTags}
          nextMode={nextMode}
          question={true}
          color="rgb(97, 252, 20)"
          bgColor="rgb(97, 252, 20, 0.5)"
          subMsg1="해당 문제에만 해당되는 태그가 있나요?"
          subMsg2="태그를 입력하고 + 버튼을 눌러주세요."
        />
      </InputLayout>
    </Wrapper>
  </Option>);
}

export default QuestionOption;