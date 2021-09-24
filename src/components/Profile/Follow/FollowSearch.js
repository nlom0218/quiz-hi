import { useMutation, useQuery } from '@apollo/client';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import SetSearchType from './SetSearchType';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 360px 1fr;
  margin-bottom: 100px;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  border-radius: 5px;
  padding: 40px 30px;
  box-shadow: ${prosp => prosp.theme.boxShadow};
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const SearchBar = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 40px;
  }
  svg {
    margin-left: 10px;
    opacity: 0.8;
  }
  input {
    padding: 8px 20px;
    border-radius: 5px;
    transition: color 1s ease, background-color 1s ease;
    ::placeholder {
      transition: color 1s ease, background-color 1s ease;
      color: ${props => props.theme.fontColor};
      opacity: 0.8;
    }
    
  }
`

const SearchInput = styled.input`
  background-color: rgb(200, 200, 200, 0.2);
`

const SubmitBtn = styled.input`
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  opacity: ${props => props.disabled ? "0.6" : 1};
  transition: opacity 0.6s ease;
  cursor: pointer;
`

const SEARCH_USER_MUTATION = gql`
  mutation searchUser($nickname: String!, $type: String!, $page: Int!, $userId: Int!) {
    searchUser(nickname: $nickname, type: $type, page: $page, userId: $userId) {
      user {
        username
        avatarURL
        nickname
        type
        totalPublicQuiz
        totalPublicQuestion
      }
    }
  }
`

const FollowSearch = ({ userId }) => {
  const [type, setType] = useState("follower")
  const [page, setPage] = useState(1)
  const { register, handleSubmit, getValues, setValue, formState: { isValid } } = useForm({
    mode: "onChange"
  })
  const onCompleted = (result) => {
    console.log(result);
  }
  const [searchUser, { loading }] = useMutation(SEARCH_USER_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    const { nickname } = data
    if (loading) {
      return
    }
    searchUser({
      variables: {
        userId,
        nickname,
        type,
        page
      }
    })
  }
  return (<Container>
    <div><FontAwesomeIcon icon={faSearch} /> 팔로워 / 팔로잉 검색</div>
    <Layout>
      <SetSearchType setType={setType} type={type} setValue={setValue} />
      <SearchBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            {...register("nickname", { required: true })}
            type="text"
            autoComplete="off"
            placeholder={`사용자의 닉네임을 검색하세요.`}
          />
          <SubmitBtn type="submit" value="검색" disabled={!isValid || getValues("nickname") === ""} />
        </form>
      </SearchBar>
    </Layout>
  </Container>);
}

export default FollowSearch;