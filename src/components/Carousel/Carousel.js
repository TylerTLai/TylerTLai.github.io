import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import theme from '../../styles/theme';
import Button from '../../styles/Button';
import NextArrow from '../Arrows/NextArrow';
import PrevArrow from '../Arrows/PrevArrow';

import {
  fetchUpcomingMovies,
  fetchMovieDetails,
} from '../../store/actions/movie';
import { URL_IMG, BACKDROP_SIZE_ORIGINAL } from '../../const';

const StyledHeader = styled.header`
  height: 570px;
  background-size: cover;
  margin-top: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${({ imgURL }) => imgURL});
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
  // console.log('carousel', movies);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const topMovies = movies.map((movie) => {
    const backdropURL = URL_IMG + BACKDROP_SIZE_ORIGINAL + movie.backdrop_path;

    const handleClick = (id) => {
      fetchMovie(id);
      console.log('from carousel', id);
    };

    return (
      <div key={movie.id}>
        <StyledHeader imgURL={backdropURL}>
          <StyledMovieText>
            <h3>COMING SOON</h3>
            <h1>{movie.title}</h1>
            <p>RELEASE DATE: {movie.release_date}</p>
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
    dots: true,
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
