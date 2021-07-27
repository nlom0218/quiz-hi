import { faImage, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import MakeQuestionForm from './MakeQuestionForm';
import QuestionTextarea from './QuestionTextarea';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .inputTitle {
    margin-bottom: 10px;
    font-size: 18px;
  }
  .subMsg {
    margin-bottom: 5px;
  }
  input {
    background-color: rgb(247, 171, 96, 0.2);
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.2s linear;
    :focus {
      background-color: rgb(247, 171, 96, 0.4);
    }
  }
`

const Option = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
`

const ImageLabel = styled.label`
  text-align: center;
  padding: 10px 0px;
  border-radius: 5px;
  background-color: rgb(247, 171, 96, 0.2);
  cursor: pointer;
  transition: background-color 0.2s linear;
  svg {
    margin-left: 10px;
  }
  :hover {
    background-color: rgb(247, 171, 96, 0.4);
  }
`

const PreviewImageBox = styled.div`
  margin-top: 10px; 
  position: relative;
  svg {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: tomato;
  }
`

const PreviewImage = styled.img`
  width: 100%;
  animation: ${fadeIn} 1s linear forwards;
`
const TagInput = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const PlusBtn = styled.div`
  font-size: 30px;
  border-radius: 50%;
  grid-column: 2 / 4;
  align-self: center;
  justify-self: left;
  margin-left: 20px;
  cursor: pointer;
  color: rgb(255, 148, 10, 0.6);
  transition: color 0.2s linear;
  :hover {
    color: rgb(255, 148, 10);
  }
`

const SeeTag = styled.div`
  margin-top: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color: rgb(255, 148, 10, 0.6);
  margin-bottom: 10px;
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.6s linear forwards;
`

const RemoveBtn = styled.div`
  margin-left: 5px;
  cursor: pointer;
`


const SubQuestion = ({ quizTags }) => {
  const [questionTags, setQuestionTags] = useState([])
  console.log(questionTags);
  const { register, watch, setValue, getValues } = useForm()
  const [previewImg, setPreviewImg] = useState(undefined)
  const onChangeImage = ({ target: { files } }) => {
    if (files.length) {
      const file = files[0]
      let reader = new FileReader();
      reader.onload = function (e) { setPreviewImg(e.target.result); }
      reader.readAsDataURL(file);
    }
  }
  const onClickRemoveImage = () => {
    setPreviewImg(undefined)
    setValue("image", null)
  }
  const onClickPlusQuizTag = () => {
    if (getValues("tag") === "") {
      return
    }
    const newQuizTags = [...questionTags, getValues("tag")]
    setQuestionTags(newQuizTags)
    setValue("tag", "")
  }
  const onClickRemoveQuizTag = (tag) => {
    const newQuizTags = questionTags.filter((item) => item !== tag)
    setQuestionTags(newQuizTags)
  }
  return (<MakeQuestionForm>
    <Wrapper>
      <span className="inputTitle">・ 문제</span>
      <QuestionTextarea register={register} />
    </Wrapper>
    <Wrapper>
      <span className="inputTitle">・ 정답</span>
      <input
        {...register("answer", {
          required: true
        })}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
    <Option>
      <Wrapper>
        <span className="inputTitle">・ 이미지</span>
        <span className="subMsg">이미지가 필요하나요?</span>
        <span className="subMsg">아래의 박스를 눌러 이미지를 불러오세요.</span>
        <ImageLabel htmlFor="image">
          사진선택하기
        <FontAwesomeIcon icon={faImage} />
        </ImageLabel>
        <input
          {...register("image")}
          type="file"
          id="image"
          style={{ display: "none" }}
          accept="image/jpeg, image/jpg, image/png"
          onChange={onChangeImage}
        />
        {previewImg && <PreviewImageBox>
          <PreviewImage src={previewImg} />
          <FontAwesomeIcon icon={faTimesCircle} onClick={onClickRemoveImage} />
        </PreviewImageBox>}
      </Wrapper>
      <Wrapper>
        <span className="inputTitle">・ 태그</span>
        <span className="subMsg">해당 문제에만 해당되는 태그가 있나요?</span>
        <span className="subMsg">태그를 입력하고 + 버튼을 눌러주세요.</span>
        <TagInput>
          <input
            {...register("tag")}
            type="text"
            autoComplete="off"
          />
          <PlusBtn><FontAwesomeIcon icon={faPlusCircle} onClick={onClickPlusQuizTag} /></PlusBtn>
          {questionTags.length !== 0 && <SeeTag>
            {questionTags.map((item, index) => {
              return <TagBox key={index}>
                {item}
                <RemoveBtn>
                  <FontAwesomeIcon
                    icon={faMinusCircle}
                    onClick={() => onClickRemoveQuizTag(item)}
                  />
                </RemoveBtn>
              </TagBox>
            })}
          </SeeTag>}
        </TagInput>
      </Wrapper>
    </Option>
  </MakeQuestionForm >);
}

export default SubQuestion;