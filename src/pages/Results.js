import { BsArrowLeft } from 'react-icons/bs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '../styles/Button';
import { ReactComponent as AltPoster } from '../assets/poster.svg';
import { searchMovie } from '../store/actions/movie';
import theme from '../styles/theme';
import { URL_IMG, IMG_SIZE_LARGE } from '../const';

const { colors, fontSizes } = theme;

const StyledResultsContainer = styled.main`
  & .backArrow {
    color: ${colors.gray};
    font-size: 55px;
    margin-left: 1rem;

    &:hover {
      color: ${colors.liteTeal};
      cursor: pointer;
    }
  }
`;

const StyledResults = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 30px;

  @media (max-width: 900px) {
    padding: 2rem;
  }
  @media (max-width: 425px) {
    padding: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  @media (max-width: 375px) {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
  @media (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
  }
`;

const StyledMoviePoster = styled.img`
  border-radius: 2px;
  opacity: 1;
  width: 100%;
  min-height: 258px;
  max-height: 258px;
`;

const StyledMovieTitle = styled.p`
  color: ${colors.white};
  font-size: ${fontSizes.md};
  text-transform: uppercase;
  text-align: left;

  @media (max-width: 375px) {
    font-size: ${fontSizes.sm};
  }
  @media (max-width: 320px) {
    font-size: ${fontSizes.xs};
  }
`;

const StyledMovieButton = styled.div`
  & button {
    width: 100%;
  }

  @media (max-width: 375px) {
    & button {
      font-size: ${fontSizes.xs};
    }
  }
`;

const StyledMovie = styled(motion.div)`
  background-color: ${colors.midGray};
  padding: 20px 10px 0 10px;
  border-radius: 3px;
  display: grid;
  grid-template-rows: 2fr 0.5fr 0.5fr;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const movies = searchResults.map((movie) => {
    const posterURL = URL_IMG + IMG_SIZE_LARGE + movie.poster_path;

    return (
      <div key={movie.id}>
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
            <AltPoster style={{ maxHeight: '258px' }} />
          )}
          <StyledMovieTitle>
            {movie.title.length > 25
              ? movie.title.slice(0, 22) + '...'
              : movie.title}
          </StyledMovieTitle>
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
    searchResults: state.movieReducer.searchedMovie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findMovie: (searchTerm) => dispatch(searchMovie(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
