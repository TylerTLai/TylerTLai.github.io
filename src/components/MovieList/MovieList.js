import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import Button from '../../styles/Button';
import { fetchMovieDetails } from '../../store/actions/movie';
import NextArrow from '../Arrows/NextArrow';
import PrevArrow from '../Arrows/PrevArrow';
import { ReactComponent as AltPoster } from '../../assets/poster.svg';
import theme from '../../styles/theme';
import { URL_IMG, IMG_SIZE_LARGE } from '../../const';

const { colors, fontSizes } = theme;

const StyledMovieListContainer = styled.main`
  padding: 0;
`;

const StyledMovieSection = styled.div`
  background-color: ${colors.darkGray};
  border-radius: 3px;
  padding: 2rem 0.5rem;

  @media (max-width: 614px) {
    padding: 0.5rem 0;
  }
`;

const StyledMovieCategory = styled.h1`
  color: ${colors.white};
  margin-top: 75px;

  &:before {
    position: relative;
    bottom: 2px;
    content: '|';
    color: ${colors.orange};
    position: relative;
    left: -1px;
  }

  @media (max-width: 425px) {
    margin-top: 30px;
    font-size: ${fontSizes.lg};
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

  @media (max-width: 425px) {
    font-size: ${fontSizes.sm};
  }
`;

const StyledMovieRating = styled.p`
  color: ${colors.white};
  font-size: ${fontSizes.sm};
  text-align: left;
`;

const StyledMovieButton = styled.div`
  & button {
    width: 100%;
  }

  @media (max-width: 425px) {
    & button {
      font-size: ${fontSizes.xs};
    }
  }
`;

const StyledMovie = styled(motion.div)`
  background-color: ${colors.midGray};
  margin-left: 10px;
  margin-right: 10px;
  padding: 20px 10px 0 10px;
  border-radius: 3px;
  display: grid;
  grid-template-rows: 2fr 30px 0.5fr 60px;
  grid-template-columns: 1fr;
  grid-template-areas:
    'poster'
    'rating'
    'title'
    'button';

  & ${StyledMoviePoster} {
    grid-area: poster;
  }
  & ${StyledMovieTitle} {
    grid-area: title;
  }
  & ${StyledMovieRating} {
    grid-area: rating;
  }
  & ${StyledMovieButton} {
    grid-area: button;
  }

  @media (max-width: 425px) {
    grid-template-rows: 1fr;
    padding: 0.3rem;

    & ${StyledMovieTitle} {
      display: none;
    }
    & ${StyledMovieRating} {
      display: none;
    }
    & ${StyledMovieButton} {
      display: none;
    }
  }
`;

function MovieList({ title, movies }) {
  const movieCollection = movies.map((movie) => {
    const posterURL = URL_IMG + IMG_SIZE_LARGE + movie.poster_path;

    return (
      <StyledMovieListContainer key={movie.id}>
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

          <StyledMovieRating>
            {movie.vote_average
              ? "Rating: " + movie.vote_average + ' | 10'
              : '----'}
          </StyledMovieRating>

          <StyledMovieButton>
            <Link to={'/' + movie.id}>
              <Button>View Movie</Button>
            </Link>
          </StyledMovieButton>
        </StyledMovie>
      </StyledMovieListContainer>
    );
  });

  const settings = {
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: false,
    draggable: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };

  return (
    <StyledMovieListContainer>
      <StyledMovieCategory>{title}</StyledMovieCategory>
      <StyledMovieSection>
        <Slider {...settings}>{movieCollection}</Slider>
      </StyledMovieSection>
    </StyledMovieListContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: (movieId) => dispatch(fetchMovieDetails(movieId)),
  };
};

export default connect(null, mapDispatchToProps)(MovieList);
