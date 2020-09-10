import { connect } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import React, { useState } from 'react';

import Button from '../../styles/Button';
import { searchMovie } from '../../store/actions/movie';
import theme from '../../styles/theme';
import { useHistory } from 'react-router-dom';

const {colors, fontSizes} = theme;

const StyledSearchContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    padding: 10px 20px 20px 20px;
    border-radius: 0 3px 3px 0;
    height: 34px;
  }
`;

const StyledSearchInput = styled.input`
  font-size: ${fontSizes.md};
  height: 30px;
  padding: 0.15rem 0.8rem;
  border: 0;
  border-radius: 3px 0 0 3px;
  width: 90%;
  background-color: ${colors.white};
`;

function SearchBar({ findMovie }) {
  
  const history = useHistory();
  const [query, setQuery] = useState('');

  const searchMovies = (e) => {
    e.preventDefault();
    findMovie(query);


    if (e.key === "Enter") {
      console.log('enter was hit');
      e.target.blur();
    }

    history.push({
      pathname: '/results',
      search: '?search=' + query,
    });
    setQuery('');
  };

  const handleChange = (e) => {
    setQuery(e.target.value);

  };

  return (
    <StyledSearchContainer onSubmit={searchMovies}>
      <StyledSearchInput
        type="text"
        placeholder="Find your favorite movies..."
        autoComplete="off"
        required={true}
        value={query}
        onChange={handleChange}
      ></StyledSearchInput>
      <Button type="submit">
        <FiSearch />
      </Button>
    </StyledSearchContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    findMovie: (searchTerm) => dispatch(searchMovie(searchTerm)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
