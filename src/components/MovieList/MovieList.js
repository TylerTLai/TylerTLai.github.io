import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { URL_IMG, IMG_SIZE_LARGE } from '../../const';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../store/actions/movie';
import { motion } from 'framer-motion';
import NextArrow from '../Arrows/NextArrow';
import PrevArrow from '../Arrows/PrevArrow';
import theme from '../../styles/theme';
import Button from '../../styles/Button';
import { ReactComponent as AltPoster } from '../../assets/poster.svg';

const { colors, fontSizes } = theme;

const StyledMovieListContainer = styled.main`
  padding: 0 0 0 50px;
`;

const StyledMovieSection = styled.div`
  background-color: ${colors.darkGray};
  padding: 2em 1em 2em 1em;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`;

const StyledMovieCategory = styled.h1`
  color: ${colors.white};
  margin-top: 75px;

  &:before {
    content: '|';
    color: ${colors.orange};
    position: relative;
    left: -1px;
  }
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
  grid-template-columns: 1fr;
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

function MovieList({ title, movies }) {
  const movieCollection = movies.map((movie) => {
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
            <AltPoster />
          )}
          <StyledMovieTitle>
            {movie.title.length <= 20
              ? movie.title
              : movie.title.slice(0, 22) + '...'}
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
          infinite: true,
          dots: true,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
