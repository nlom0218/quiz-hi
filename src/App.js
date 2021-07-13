import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import { GlobalStyle } from './styles';

const Main = styled.div`
  height: 100%;
  width: 1200px;
  margin: 0 auto;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 30px);
`

const Hello = styled.div`
  background-color: blue;
  grid-column: 1 / 11;
  grid-row: 1 / 4;
`

const Hi = styled.div`
  grid-column: 11 / 13 ;
  background-color: red;
`

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Header />
      {/* <Main>
        <Container>
          <Hello>Hello</Hello>
          <Hi>Hi</Hi>
        </Container>
      </Main> */}
    </React.Fragment>
  );
}

export default App;
