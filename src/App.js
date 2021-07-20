import React from 'react';
import { darkTheme, GlobalStyle, lightTheme } from './styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar } from './apollo';
import Login from './pages/Login';
import PlayQuiz from "./pages/PlayQuiz"
import CreateAccount from './pages/CreateAccount';
import ScrollToTop from './hooks/ScrollToTop';
import QuizFeed from './pages/QuizFeed';
import MakeQuiz from './pages/MakeQuiz';
import NoticeBoard from './pages/NoticeBoard';
import Me from './pages/Me';
import useUser from './hooks/useUser';
import Certification from './pages/Certification';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  const user = useUser()
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/quiz-feed"><QuizFeed /></Route>
          <Route path="/notice-board"><NoticeBoard /></Route>
          <Route path="/make-quiz">{user ? <MakeQuiz /> : <Certification />}</Route>
          <Route path="/play-quiz">{user ? <PlayQuiz /> : <Certification />}</Route>
          <Route path="/me">{user ? <Me /> : <Certification />}</Route>
          <Route path="/login"><Login /></Route>
          <Route path="/create-account"><CreateAccount /></Route>
        </Switch>
      </Router>
    </ThemeProvider >
  );
}

export default App;
