import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import InputBtn from '../InputBtn';
import EditInputLayout from './EditInputLayout';
import EditTagInput from './EditTagInput';

const SEditForm = styled.form`
  border: 1px solid ${props => props.theme.fontColor};
  padding: 40px 30px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 60px;
  transition: border 1s ease;
  box-shadow: ${props => props.theme.boxShadow};
`

const InputTitle = styled.div`
  
`

const EDIT_QUIZ_MUTATION = gql`
  mutation editQuiz($id: Int!, $title: String!, $caption: String!, $tags: String!, $updataInfo: String!) {
    editQuiz(id: $id, title: $title, caption: $caption, tags: $tags, updateInfo: $updataInfo) {
      ok
      error
    }
  }
`

const EditQuizForm = ({ title, caption, tags, user: { id: ownerId } }) => {
  const { id } = useParams()
  const user = useUser()
  const history = useHistory()
  useEffect(() => {
    if (!user) {
      alert("잘못된 접근입니다.")
      history.push("/")
      return
    }
    if (user.id !== ownerId) {
      alert("잘못된 접근입니다.")
      history.push("/")
    }
  }, [])
  const [quizTags, setQuizTags] = useState(tags.map((item) => item.name))
  const { register, formState: { isValid }, handleSubmit, getValues, setValue } = useForm({
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
    <EditInputLayout>
      <InputTitle>퀴즈 제목 수정하기</InputTitle>
      <input
        {...register("title", {
          required: true
        })}
        type="text"
        autoComplete="off"
      />
    </EditInputLayout>
    <EditInputLayout>
      <InputTitle>퀴즈 설명 수정하기</InputTitle>
      <textarea
        cols={20}
        rows={5}
        {...register("caption", {
          required: true
        })}
      ></textarea>
    </EditInputLayout>
    <EditInputLayout>
      <InputTitle>퀴즈 태그 수정하기</InputTitle>
      <EditTagInput
        register={register}
        tags={quizTags}
        getValues={getValues}
        setValue={setValue}
        setTags={setQuizTags}
      />
    </EditInputLayout>
    <EditInputLayout>
      <InputTitle>업데이트 내용</InputTitle>
      <textarea
        cols={20}
        rows={5}
        {...register("updataInfo", {
          required: true
        })}
      ></textarea>
    </EditInputLayout>
    <InputBtn disabled={!isValid} value="수정하기" />
  </SEditForm>);
}

export default EditQuizForm;