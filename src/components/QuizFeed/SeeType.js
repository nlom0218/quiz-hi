import { faBook, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';


const SSeeType = styled.div`
  width: 100%;
  grid-column: 2 / -2;
  grid-row: 2 / 3;
  display: grid;
  grid-template-columns: auto auto 1fr;
`

const Wrapper = styled.div`
  justify-self: flex-start;
  display: flex;
  margin-right: 20px;
  opacity: ${props => props.selected ? 1 : 0.6};
  cursor: pointer;
  transition: opacity 0.3s linear;
`

const SeeText = styled.div`
  margin-left: 5px;
`

const SeeType = ({ seeType, setSeeType }) => {
  const onClickSeeType = (type) => {
    setSeeType(type)
  }
  return (<SSeeType>
    <Wrapper selected={seeType === "all"} onClick={() => onClickSeeType("all")}>
      <FontAwesomeIcon icon={faBook} />
      <SeeText>전체보기</SeeText>
    </Wrapper>
    <Wrapper selected={seeType === "tags"} onClick={() => onClickSeeType("tags")}>
      <FontAwesomeIcon icon={faTags} />
      <SeeText>태그별 보기</SeeText>
    </Wrapper>
  </SSeeType>);
}

export default SeeType;