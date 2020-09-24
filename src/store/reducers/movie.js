import {
  FETCH_UPCOMING_MOVIES,
  FETCH_MOST_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_NOW_PLAYING_MOVIES,
  FETCH_MOVIE_DETAILS,
  FETCH_VIDEOS,
  FETCH_CREDITS,
  SEARCH_MOVIE,
} from '../actions/movie';

const initialState = {
  upcoming: [],
  topRated: [],
  mostPopular: [],
  nowPlaying: [],
  movieDetails: [],
  credits: [],
  videos: [],
  searchedMovie: [],
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPCOMING_MOVIES:
      return { ...state, upcoming: action.payload };

    case FETCH_MOST_POPULAR_MOVIES:
      return { ...state, mostPopular: action.payload };

    case FETCH_TOP_RATED_MOVIES:
      return { ...state, topRated: action.payload };

    case FETCH_NOW_PLAYING_MOVIES:
      return { ...state, nowPlaying: action.payload };

    case FETCH_MOVIE_DETAILS:
      return { ...state, movieDetails: action.payload };

    case FETCH_CREDITS:
      return { ...state, credits: action.payload };

    case FETCH_VIDEOS:
      return { ...state, videos: action.payload };

    case SEARCH_MOVIE:
      return { ...state, searchedMovie: action.payload };

    default:
      return state;
  }
};
