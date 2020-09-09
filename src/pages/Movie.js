import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import { URL_IMG, BACKDROP_SIZE_ORIGINAL } from '../const';
import {
  fetchMovieDetails,
  fetchCredits,
  fetchVideos,
} from '../store/actions/movie';
import { BsArrowLeft } from 'react-icons/bs';
import theme from '../styles/theme';
import Button from '../styles/Button';
import Modal from '../components/Modal/Modal';
import { ReactComponent as AltPoster } from '../assets/poster.svg';

const { colors, fontSizes } = theme;

const StyledDetails = styled.div`
  color: ${colors.white};
  padding-right: 2rem;
  /* border: 2px solid red; */

  & .backArrow {
    color: ${colors.gray};
    transition: 0.1s ease-in-out;

    &:hover {
      color: ${colors.lightTeal};
      cursor: pointer;
    }
  }

  & h1 {
    font-size: ${fontSizes.xl};
    color: ${colors.white};
    text-transform: uppercase;
  }

  & h2 {
    color: ${colors.orange};
    font-size: ${fontSizes.lg};
  }

  & h3 {
    color: ${colors.gray};

    & p {
      color: ${colors.orange};
      font-size: ${fontSizes.xs};
      letter-spacing: 2px;
    }
  }

  & p {
    line-height: 2;
  }
`;

const StyledInfo = styled.div`
  margin-top: 1em;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1px;
`;

const StyledBackdrop = styled.div`
  background-image: linear-gradient(
      to right,
      ${colors.black} 1%,
      rgba(0, 0, 0, 0) 10%,
      rgba(0, 0, 0, 0)
    ),
    url(${({ imgURL }) => imgURL});
  background-size: cover;
  background-position: center;
  width: 100%;
  background-repeat: no-repeat;
`;

const StyledTopContainer = styled.div`
  background-color: ${colors.black};
  display: grid;
  grid-template-columns: 375px;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-template-areas: 'details backdrop';

  & ${StyledDetails} {
    grid-area: details;
  }

  & ${StyledBackdrop} {
    grid-area: backdrop;
  }

  @media (max-width: 990px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1.5fr;
    grid-auto-flow: row;
    grid-auto-columns: 1fr;
    grid-template-areas:
      'backdrop'
      'details';
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 1fr;
    grid-auto-flow: row;
    grid-auto-columns: 1fr;
    grid-template-areas:
      'backdrop'
      'details';
  }
`;

const StyledBottomContainer = styled.div`
  display: grid;
  background-color: ${colors.black};
  color: ${colors.white};
  padding: 2em;
  flex: 1;

  & h1 {
    font-size: ${fontSizes.xl};
  }
`;

function Movie({
  movieDetails,
  fetchMovie,
  fetchCredits,
  fetchVideos,
  credits,
  videos,
  history,
}) {
  useEffect(() => {
    const movieId = history.location.pathname.slice(1);
    fetchMovie(movieId);
    fetchVideos(movieId);
    fetchCredits(movieId);
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setShowModal] = useState(false);

  const trailerKey =
    videos !== 'undefined' && videos.length > 0
      ? videos.filter((video) => video.site === 'YouTube')[0].key
      : 'no key';

  const backdropURL =
    URL_IMG + BACKDROP_SIZE_ORIGINAL + movieDetails.backdrop_path;

  const showTrailer = () => {
    setShowModal((prevState) => !prevState);
  };

  const convertRuntime = (num) => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + 'h ' + rminutes + 'm';
  };

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        trailerKey={trailerKey}
      />
      <StyledTopContainer>
        <StyledDetails>
          <BsArrowLeft className="backArrow" onClick={history.goBack} size={55} />

          <h1 style={{ color: `${colors.white}` }}>{movieDetails.title}</h1>
          
          <h2>
            <em>{movieDetails.tagline}</em>
          </h2>

          <Button onClick={showTrailer}>WATCH TRAILER</Button>

          <StyledInfo>
            <h3>
              Release Date
              <p>{moment(movieDetails.release_date).format('MMM Do YYYY')}</p>
            </h3>
            <h3>
              Rating
              <p>
                {movieDetails.vote_average
                  ? movieDetails.vote_average + ' | 10'
                  : '----'}
              </p>
            </h3>
            <h3>
              Runtime <p>{convertRuntime(movieDetails.runtime)}</p>
            </h3>
          </StyledInfo>

          <h3>Plot</h3>
          <p>{movieDetails.overview}</p>

        </StyledDetails>

        {movieDetails.backdrop_path ? (
          <StyledBackdrop
            imgURL={backdropURL}
            onClick={showTrailer}
          ></StyledBackdrop>
        ) : (
          <AltPoster />
        )}

      </StyledTopContainer>

      <StyledBottomContainer>
        {/* <h1>Cast & Crew</h1> */}
        {/* <p>{cast}</p> */}
        {/* <h1>Images</h1> */}
      </StyledBottomContainer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    movieDetails: state.getMovies.movieDetails,
    credits: state.getMovies.credits,
    videos: state.getMovies.videos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovie: (movieId) => dispatch(fetchMovieDetails(movieId)),
    fetchCredits: (movieId) => dispatch(fetchCredits(movieId)),
    fetchVideos: (movieId) => dispatch(fetchVideos(movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
