import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getCreatedDay } from "../../../sharedFn"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr auto;
  row-gap: 20px;
  padding: 20px;
  svg {
    cursor: pointer;
  }
  :nth-child(odd) {
    background-color: rgb(200, 200, 200, 0.2);
  }
`

const Date = styled.div``

const Title = styled.div``

const SetHomework = styled.div`
  grid-column: 2 / -1;
`

const HomeworkItem = ({ createdAt, title }) => {
  const [setMode, setSetMode] = useState(false)
  const onClickSettingBtn = () => {
    setSetMode(prev => !prev)
  }
  return (<Wrapper>
    <Date>{getCreatedDay(createdAt)}</Date>
    <Title>{title}</Title>
    <FontAwesomeIcon icon={faInfoCircle} onClick={onClickSettingBtn} />
    {setMode && <SetHomework>
      sdds
    </SetHomework>}
  </Wrapper>);
}

export default HomeworkItem;