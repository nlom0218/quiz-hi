import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / -1;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 40px;
`

const ActionBtn = styled.div``

const OptionBox = () => {
  return (<Container>
    <ActionBtn>홈</ActionBtn>
    <ActionBtn>홈</ActionBtn>
    <ActionBtn>홈</ActionBtn>
    <ActionBtn>홈</ActionBtn>
    <ActionBtn>홈</ActionBtn>
    <ActionBtn>홈</ActionBtn>
  </Container>);
}

export default OptionBox;