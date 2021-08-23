import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / -1;
  /* align-self: flex-start; */
  background-color: red;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  row-gap: 20px;
`

const OptionBox = () => {
  return (<Container>
    <div>홈</div>
    <div>홈</div>
    <div>홈</div>
    <div>홈</div>
    <div>홈</div>
    <div>홈</div>
  </Container>);
}

export default OptionBox;