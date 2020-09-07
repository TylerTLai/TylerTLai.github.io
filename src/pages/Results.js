import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '../styles/theme';
import Button from '../styles/Button';
import { motion } from 'framer-motion';
import { URL_IMG, IMG_SIZE_LARGE } from '../const';
import { Link } from 'react-router-dom';
import { searchMovie } from '../store/actions/movie';
import { BsArrowLeft } from 'react-icons/bs';

import { ReactComponent as AltPoster } from '../assets/poster.svg';

const { colors, fontSizes } = theme;

const StyledResultsContainer = styled.main`
  background-color: ${colors.black};
  padding: 0 50px;

  & .backArrow {
    color: ${colors.gray};
    font-size: ${fontSizes.xl};
    margin: 10px;

    &:hover {
      color: ${colors.liteTeal};
      cursor: pointer;
    }
  }
`;

const StyledResults = styled.div`
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: repeat(6, 1fr);
`;

const StyledMoviePoster = styled.img`
  border-radius: 2px;
  opacity: 1;
  width: 100%;
`;

const StyledMovieTitle = styled.p`
  color: ${colors.white};
  font-size: ${fontSizes.md};
  text-transform: uppercase;
  text-align: left;
`;

const StyledMovieButton = styled.div`
  & button {
    width: 100%;
  }
`;

const StyledMovie = styled(motion.div)`
  background-color: ${colors.midGray};
  margin-left: 10px;
  margin-right: 10px;
  padding: 20px 10px 0 10px;
  border-radius: 3px;
  display: grid;
  grid-template-rows: 2fr 0.5fr 0.5fr;
  grid-template-columns: 180px;
  grid-template-areas:
    'poster'
    'title'
    'button';

  & ${StyledMoviePoster} {
    grid-area: poster;
  }
  & ${StyledMovieTitle} {
    grid-area: title;
  }
  & ${StyledMovieButton} {
    grid-area: button;
  }
`;

function Results({ searchResults, findMovie, history }) {
  useEffect(() => {
    let searchQuery = history.location.search.replace('?search=', '');
    findMovie(searchQuery);
  }, []);

  const movies = searchResults.map((movie) => {
    const posterURL = URL_IMG + IMG_SIZE_LARGE + movie.poster_path;

    return (
      <div key={movie.id} style={{ display: 'flex', width: '100%' }}>
        <StyledMovie
          whileHover={{ backgroundColor: 'rgba(87, 103, 119, 0.5)' }}
        >
          {movie.poster_path ? (
            <Link to={'/' + movie.id}>
              <StyledMoviePoster
                src={posterURL}
                alt={movie.title + ' poster'}
              />
            </Link>
          ) : (
            <AltPoster />
          )}
          <StyledMovieTitle>{movie.title}</StyledMovieTitle>
          <StyledMovieButton>
            <Link to={'/' + movie.id}>
              <Button>View Movie</Button>
            </Link>
          </StyledMovieButton>
        </StyledMovie>
      </div>
    );
  });

  return (
    <>
      <StyledResultsContainer>
        <BsArrowLeft className="backArrow" onClick={history.goBack} />
        <StyledResults>{movies}</StyledResults>
      </StyledResultsContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.getMovies.searchedMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findMovie: (searchTerm) => dispatch(searchMovie(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
