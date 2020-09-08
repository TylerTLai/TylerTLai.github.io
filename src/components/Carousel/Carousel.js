import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import Slider from 'react-slick';

import theme from '../../styles/theme';
import Button from '../../styles/Button';
import NextArrow from '../Arrows/NextArrow';
import PrevArrow from '../Arrows/PrevArrow';
import { URL_IMG, BACKDROP_SIZE_ORIGINAL } from '../../const';

import {
  fetchUpcomingMovies,
  fetchMovieDetails,
} from '../../store/actions/movie';

const StyledHeader = styled.header`
  height: 570px;
  background-size: cover;
  margin-top: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${({ imgURL }) => imgURL});

  @media(max-width: 600px) {
    height: 350px;
  }
`;

const StyledMovieText = styled.div`
  text-align: left;
  position: relative;
  top: 65%;
  left: 60%;
  transform: translate(-50%, -50%);
  color: ${theme.colors.white};

  & h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: ${theme.colors.white};
    font-size: 2.5em;
    font-weight: bolder;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  & h3 {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1em;
    letter-spacing: 2px;
    text-decoration: underline;
  }

  & button {
    border: 1px solid ${theme.colors.white};
    }
  }
`;

function Carousel({ movies, getMovies, fetchMovie }) {

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const topMovies = movies.map((movie) => {
    const backdropURL = URL_IMG + BACKDROP_SIZE_ORIGINAL + movie.backdrop_path;

    const handleClick = (id) => {
      fetchMovie(id);
    };

    return (
      <div key={movie.id}>
        <StyledHeader imgURL={backdropURL}>
          <StyledMovieText>
            <h3>COMING SOON</h3>
            <h1>{movie.title}</h1>
            <p>
              Release Date: <br />
              {moment(movie.release_date).format('MMM Do YYYY')}
            </p>
            <Link to={'/' + movie.id}>
              <Button onClick={() => handleClick(movie.id)}>View Movie</Button>
            </Link>
          </StyledMovieText>
        </StyledHeader>
      </div>
    );
  });

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    mobileFirst: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <Slider {...settings}>{topMovies}</Slider>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: state.getMovies.upcoming,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: () => dispatch(fetchUpcomingMovies()),
    fetchMovie: (movieId) => dispatch(fetchMovieDetails(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
