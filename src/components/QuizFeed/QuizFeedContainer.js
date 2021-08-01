import { faCheck, faChevronDown, faChevronUp, faSearch, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { gsap } from "gsap"
import { QuizFeedBottomContainer } from '../../hooks/Gsap';
import QuizQuestionBasket from './QuizQuestionBasket';
gsap.registerPlugin(ScrollTrigger)

const SQuizFeedContainer = styled.div`
  grid-column: 2 / -2;
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 30px;
`

const TopBar = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  gap: 30px;
`

const SearchBar = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  svg {
    margin-left: 10px;
    opacity: 0.8;
  }
  input {
    padding: 8px 10px;
    width: 500px;
    ::placeholder {
      transition: color 1s ease, background-color 1s ease;
      color: ${props => props.theme.fontColor};
      opacity: 0.8;
    }
  }
`

const PageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
`

const PageBarBtn = styled.div`
  padding: 8px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.firstPage && "0.4"};
    cursor: ${props => props.firstPage ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
    opacity: ${props => props.lastPage && "0.4"};
    cursor: ${props => props.lastPage ? "not-allowd" : "pointer"};
  }
`

const SortBar = styled.div`
  justify-self: flex-end;
  padding: 8px 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
  border-radius: 5px;
  display: flex;
  position: relative;
`

const Sort = styled.div`
  margin-right: 10px;
`

const SortBtn = styled.div`
  cursor: pointer;
`

const SortList = styled.ul`
  position: absolute;
  top: 40px;
  right: 0px;
  background-color: ${props => props.theme.grayColor};
  display: grid;
  grid-template-columns: 140px;
  grid-template-rows: 1fr 1fr 1fr;
  border-radius: 5px;
  animation: ${fadeIn} 0.4s linear;
  transition: background-color 1s ease;
`

const SortItem = styled.li`
  margin: 5px 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  svg {
    margin-left: 10px;
    font-size: 12px;
  }
  display: flex;
  align-items: center;
`

const QuizFeedContainer = ({ children, feedType, setSearch, sort, setSort, setPutQuiz, setPage, page, lastPage }) => {
  const [seeSortList, setSeeSortList] = useState(false)
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    setSearch(data.search)
  }
  const processSort = (sort) => {
    if (sort === "recent") {
      return "최신순"
    } else if (sort === "likes") {
      return "좋아요순"
    } else if (sort === "hits") {
      return "조회순"
    }
  }
  const onClickSortBtn = () => {
    setSeeSortList(prev => !prev)
  }
  const onClickSortItem = (sort) => {
    setSort(sort)
    setSeeSortList(prev => !prev)
  }
  const onClickPageBtn = (type) => {
    if (type === "pre") {
      if (page === 1) {
        return
      }
      setPage(pre => pre - 1)
    } else if (type === "next") {
      if (lastPage) {
        return
      }
      setPage(pre => pre + 1)
    }
  }
  return (<SQuizFeedContainer className="quizFeedContainer">
    <QuizFeedBottomContainer />
    <TopBar>
      <SearchBar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            {...register("search")}
            type="text"
            autoComplete="off"
            placeholder={`${feedType === "quiz" ? "퀴즈" : "문제"}를 검색하세요.`}
          />
        </form>
      </SearchBar>
      <PageBar>
        <PageBarBtn firstPage={page === 1 ? true : false} onClick={() => onClickPageBtn("pre")}>이전</PageBarBtn>
        <PageBarBtn lastPage={lastPage} onClick={() => onClickPageBtn("next")}>다음</PageBarBtn>
      </PageBar>
      <SortBar>
        <Sort>{processSort(sort)}</Sort>
        <SortBtn onClick={onClickSortBtn}>
          <FontAwesomeIcon icon={seeSortList ? faChevronUp : faChevronDown} />
        </SortBtn>
        {seeSortList && <SortList>
          <SortItem onClick={() => onClickSortItem("recent")}>최신순
            {sort === "recent" && <FontAwesomeIcon icon={faCheck} />}
          </SortItem>
          <SortItem onClick={() => onClickSortItem("likes")}>좋아요순
            {sort === "likes" && <FontAwesomeIcon icon={faCheck} />}
          </SortItem>
          <SortItem onClick={() => onClickSortItem("hits")}>조회순
            {sort === "hits" && <FontAwesomeIcon icon={faCheck} />}
          </SortItem>
        </SortList>}
      </SortBar>
    </TopBar>
    {children}
    <QuizQuestionBasket setPutQuiz={setPutQuiz} />
  </SQuizFeedContainer>);
}

export default QuizFeedContainer;