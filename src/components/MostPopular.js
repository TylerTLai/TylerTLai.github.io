import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieCardList from './MovieCardList';

const MostPopular = ({ movieData, ...props}) => {
  const [popularMovies, setPopularMovies] = useState([]);

  const discoverPopularMovies = async (e) => {
    const API_KEY = process.env.REACT_APP_TMDB_KEY;
    
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setPopularMovies(data.results);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    discoverPopularMovies();
  }, []);

  const clearSearchResults = () => {
    alert('clear search results');
  };

  // console.log('from mostpopular', props)

  return (
    <div>
      {movieData && movieData.length ? (
        <>
          {/* <h3 className="SearchResults">Search Results</h3>
          <button className="ClearButton" onClick={clearSearchResults}>
            Clear search results
          </button> */}
          <MovieCardList movies={movieData} />
        </>
      ) : (
        <>
          <h1 className="title">Most Popular</h1>
          <div className="MovieCardList">
            {popularMovies
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <MovieCard key={movie.id} id={movie.id} movie={movie} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MostPopular;
