import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from '../../styles/GlobalStyles';
import Navbar from '../Navbar/Navbar';
import Home from '../../pages/Home';
import Movie from '../../pages/Movie';
import Results from '../../pages/Results';
import NoMatch from '../../pages/NoMatch';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route exact path="/results" component={Results} />
        <Route exact path="/:movie_id" component={Movie} />
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
