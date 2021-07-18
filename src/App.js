import React from 'react';
import { darkTheme, GlobalStyle, lightTheme } from './styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { client, darkModeVar } from './apollo';
import Login from './pages/Login';
import PlayQuiz from "./pages/PlayQuiz"
import CreateAccount from './pages/CreateAccount';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/play-quiz"><PlayQuiz /></Route>
            <Route path="/create-account"><CreateAccount /></Route>
          </Switch>
        </Router>
      </ThemeProvider >
    </ApolloProvider>
  );
}

export default App;
