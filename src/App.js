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
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import Library from './pages/Library';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  const user = useUser()
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme} >
      <GlobalStyle fontFamily={user?.fontFamily} />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route path="/feed/:type/:seeType/:sort/:page"><Feed /></Route>
          <Route path="/detail/quiz/:id"><FeedQuiz /></Route>
          <Route path="/detail/question/:id"><FeedQuestion /></Route>
          <Route path="/detail/tag/:id/:type/:sort/:page"><FeedTag /></Route>
          <Route path="/notice-board"><NoticeBoard /></Route>
          <Route path="/make-quiz">{user ? <MakeQuiz /> : <NotFound />}</Route>
          <Route exact path="/play-quiz">{user ? <PlayQuiz /> : <NotFound />}</Route>
          <Route path="/library">{user ? <Library /> : <NotFound />}</Route>
          <Route path="/profile/:username/:mode/:state/:type/:page">{user ? <Profile /> : <NotFound />}</Route>
          <Route path="/profile/:username/:mode">{user ? <Profile /> : <NotFound />}</Route>
          <Route path="/login"><Login /></Route>
          <Route path="/create-account"><CreateAccount /></Route>
          <Route path="/edit/:type/:id"><Edit /></Route>
          <Route path="/delete/:type/:id"><Delete /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </Router>
    </ThemeProvider >
  );
}

export default App;
