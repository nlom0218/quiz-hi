import { useMutation } from '@apollo/client';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import InputBtn from '../InputBtn';
import TagContainer from '../MakeQuiz/TagContainer';

const SEditForm = styled.form`
  border: 1px solid ${props => props.theme.fontColor};
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
  transition: border 1s ease;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  column-gap: 30px;
  input {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(200, 200, 200, 0.2);
    transition: box-shadow 0.4s linear;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    }
  }
  textarea {
    width: 100%;
    resize: none;
    border: none;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px 20px;
    color: ${props => props.theme.fontColor};
    background-color: rgb(200, 200, 200, 0.2);
    transition: box-shadow 0.4s linear, color 1s ease;
    :focus {
      box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
      outline: none;
    }
  }
`

const InputTitle = styled.div`
  
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
  color: rgb(201, 102, 255, 0.2);
  transition: color 0.4s linear;
  :hover {
    color: rgb(201, 102, 255, 0.6);
  }
`

const SeeTag = styled.div`
  margin-top: 10px;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
`

const TagBox = styled.div`
  background-color: rgb(201, 102, 255, 0.4);
  font-size: 14px;
  margin-bottom: 10px;
  padding: 5px 10px;
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

const EDIT_QUIZ_MUTATION = gql`
  mutation editQuiz($id: Int!, $title: String!, $caption: String!, $tags: String!, $updataInfo: String!) {
    editQuiz(id: $id, title: $title, caption: $caption, tags: $tags, updateInfo: $updataInfo) {
      ok
      error
    }
  }
`

const EditQuizForm = ({ title, caption, tags }) => {
  const { id } = useParams()
  const history = useHistory()
  const [quizTags, setQuizTags] = useState(tags.map((item) => item.name))
  const { register, setValue, getValues, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      title,
      caption
    }
  })
  const onCompleted = (result) => {
    const { editQuiz: { ok } } = result
    if (ok) {
      history.push(`/detail/quiz/${id}`)
      window.location.reload()
    }
  }
  const [editQuiz, { loading }] = useMutation(EDIT_QUIZ_MUTATION, {
    onCompleted
  })
  const onClickPlusQuizTag = () => {
    if (getValues("tag") === "") {
      return
    }
    const newQuizTags = [...quizTags, getValues("tag")]
    setQuizTags(newQuizTags)
    setValue("tag", "")
  }
  const onClickRemoveQuizTag = (tag) => {
    const newQuizTags = quizTags.filter((item) => item !== tag)
    setQuizTags(newQuizTags)
  }
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const { title, caption, updataInfo } = data
    const tags = [...quizTags].join(",")
    editQuiz({
      variables: {
        id: parseInt(id),
        title,
        caption,
        tags,
        updataInfo
      }
    })
  }
  return (<SEditForm onSubmit={handleSubmit(onSubmit)}>
    <Wrapper>
      <InputTitle>퀴즈 제목 수정하기</InputTitle>
      <input
        {...register("title", {
          required: true
        })}
        type="text"
        autoComplete="off"
      />
    </Wrapper>
    <Wrapper>
      <InputTitle>퀴즈 설명 수정하기</InputTitle>
      <textarea
        cols={20}
        rows={5}
        {...register("caption", {
          required: true
        })}
      ></textarea>
    </Wrapper>
    <Wrapper>
      <InputTitle>퀴즈 태그 수정하기</InputTitle>
      <TagInput>
        <input
          {...register("tag")}
          type="text"
          autoComplete="off"
        />
        <PlusBtn><FontAwesomeIcon icon={faPlusCircle} onClick={onClickPlusQuizTag} /></PlusBtn>
        {quizTags.length !== 0 && <SeeTag>
          {quizTags.map((item, index) => {
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
    <Wrapper>
      <InputTitle>업데이트 내용</InputTitle>
      <textarea
        cols={20}
        rows={5}
        {...register("updataInfo", {
          required: true
        })}
      ></textarea>
    </Wrapper>
    <InputBtn disabled={!isValid} value="수정하기" />
  </SEditForm>);
}

export default EditQuizForm;