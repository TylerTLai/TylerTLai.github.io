import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from '../../styles/theme';
import SearchBar from '../SearchBar/SearchBar';
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';

const StyledLogoContainer = styled.div`
  display: grid;
  justify-content: center;

  @media(max-width: 600px) {
    display: none !important;
  }
`;

const StyledSearchContainer = styled.div`
    display: grid;
    align-items: center;
`;

const StyledNavbar = styled.nav`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'logo search';

  & ${StyledLogoContainer} {
    grid-area: logo;
  }

  & ${StyledSearchContainer} {
    grid-area: search;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas:
    'search'
  }
`;

function Navbar() {
  return (
    <StyledNavbar>

      <StyledLogoContainer>
        <NavLink to="/">
          <ReactLogo style={{ height: '39px'}} />
        </NavLink>
      </StyledLogoContainer>

      <StyledSearchContainer>
        <SearchBar className='searchBar' />
      </StyledSearchContainer>

    </StyledNavbar>
  );
}

export default Navbar;
