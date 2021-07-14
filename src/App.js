import React from 'react';
import Header from './components/Header';
import { GlobalStyle } from './styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './pages/Home';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
