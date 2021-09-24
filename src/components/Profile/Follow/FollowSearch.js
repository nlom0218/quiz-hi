import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 360px 1fr;
  margin-bottom: 100px;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
`

const FollowSearch = () => {
  const { register, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => { }
  return (<Container>
    <div><FontAwesomeIcon icon={faSearch} /> 팔로워 / 팔로잉 검색</div>
    <Layout>
      <SearchBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            {...register("search")}
            type="text"
            autoComplete="off"
            placeholder={`팔로워 / 팔로잉을 검색하세요.`}
          />
          <SubmitBtn type="submit" value="검색" />
        </form>
      </SearchBar>
    </Layout>
  </Container>);
}

export default FollowSearch;