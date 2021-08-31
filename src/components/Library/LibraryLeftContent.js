import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 2 / 3;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 30px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  svg {
    margin-left: 5px;
  }
`

const RemoveAllBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const Title = styled.div`
  justify-self: flex-end;
`

const Box = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  padding: 20px 10px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const LibraryLeftContent = () => {
  return (<Container>
    <Wrapper>
      <Title>선택된 퀴즈<FontAwesomeIcon icon={faHandPointer} /></Title>
      <Box>

      </Box>
    </Wrapper>
    <Wrapper>
      <Title>선택된 문제<FontAwesomeIcon icon={faHandPointer} /></Title>
      <Box>

      </Box>
    </Wrapper>
    <RemoveAllBtn>
    </RemoveAllBtn>
  </Container>);
}

export default LibraryLeftContent;