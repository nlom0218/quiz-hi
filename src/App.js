import React from 'react';
import Header from './components/Header';
import { darkTheme, GlobalStyle, lightTheme } from './styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar } from './apollo';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <React.Fragment>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
        <GlobalStyle />
        <Router>
          <Header />
          <Switch>
            <Route exact path="/"><Home /></Route>
          </Switch>
        </Router>
      </ThemeProvider >
    </React.Fragment>
  );
}

export default App;
