import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import MostPopular from './components/MostPopular';
import Navbar from './components/Navbar';
import TopRated from './components/TopRated';
import Search from './components/Search';

function App() {
  const [movieData, setMovieData] = useState([]);

  const getMovieData = (movies) => {
    setMovieData(movies);
  };

  return (
    <div>
      <Navbar movieData={getMovieData} />

      <Switch>

        <Route exact path="/top-rated">
          <TopRated movieData={movieData} />
        </Route>

        <Route exact path="/most-popular">
          <MostPopular movieData={movieData} />
        </Route>

        <Route exact path="/:movie_id" component={MovieDetail} />
        
        <Route path='/search' component={Search} />
{/* 
        <Route exact path="/search">
          <Search movieData={movieData} />
        </Route> */}

        <Route exact path="/">
          <Home movieData={movieData} />
        </Route>
        
        <Route exact path="/home">
          <Home movieData={movieData} />
        </Route>

        <Route
          render={() => (
            <h2 style={{ textAlign: 'center' }}>
              Uh oh, page not Found!{' '}
              <span role="img" aria-label="loudly crying face">
                😭
              </span>
            </h2>
          )}
        />

      </Switch>
    </div>
  );
}

export default App;
