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
import Feed from './pages/Feed';
import MakeQuiz from './pages/MakeQuiz';
import NoticeBoard from './pages/NoticeBoard';
import Profile from './pages/Profile';
import useUser from './hooks/useUser';
import NotFound from './pages/NotFound';
import FeedQuiz from './pages/FeedQuiz';
import FeedQuestion from './pages/FeedQuestion';
import FeedTag from './pages/FeedTag';

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
          <Route exact path="/feed"><Feed /></Route>
          <Route path="/feed/quiz/:id"><FeedQuiz /></Route>
          <Route path="/feed/question/:id"><FeedQuestion /></Route>
          <Route path="/feed/tag/:id"><FeedTag /></Route>
          <Route path="/notice-board"><NoticeBoard /></Route>
          <Route path="/make-quiz">{user ? <MakeQuiz /> : <NotFound />}</Route>
          <Route path="/play-quiz">{user ? <PlayQuiz /> : <NotFound />}</Route>
          <Route path="/profile/:username">{user ? <Profile /> : <NotFound />}</Route>
          <Route path="/login"><Login /></Route>
          <Route path="/create-account"><CreateAccount /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </Router>
    </ThemeProvider >
  );
}

export default App;
