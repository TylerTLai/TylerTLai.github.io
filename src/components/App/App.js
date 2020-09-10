import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyle from '../../styles/GlobalStyles';
import Navbar from '../Navbar/Navbar';
import Home from '../../pages/Home';
import Movie from '../../pages/Movie';
import Results from '../../pages/Results';
import Page404 from '../../pages/Page404';

function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route exact path="/results" component={Results} />
        <Route exact path="/:movie_id" component={Movie} />
        <Route exact path="/" component={Home} />
        <Route component={Page404} />
      </Switch>
    </>
  );
}

export default App;
