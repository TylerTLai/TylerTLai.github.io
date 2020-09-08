import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from '../../styles/theme';
import SearchBar from '../SearchBar/SearchBar';
import { ReactComponent as ReactLogo } from '../../assets/logo.svg';

const StyledLogoContainer = styled.div`
  border: 1px solid teal;
`;

const StyledSearchContainer = styled.div`
  
`;

const StyledLinksContainer = styled.div`
  border: 1px solid lime;

  @media (max-width: 375px) {
    display: none !important;
  }
`;

const StyledNavbar = styled.nav`
  /* border: 1px solid red; */
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  margin: 0;
  padding: 0.6em;
  display: grid;
  grid-template-columns: 0.5fr 2fr 0.5fr;
  grid-template-areas: 'logo search links';

  a {
    font-size: 1em;
    color: ${theme.colors.white};
  }

  a:hover {
    color: ${theme.colors.lightTeal};
  }

  & ${StyledLogoContainer} {
    grid-area: logo;
    display: grid;
    justify-content: space-around;
    align-items: center;
  }

  & ${StyledSearchContainer} {
    grid-area: search;
    display: grid;
    align-items: center;
  }

  & ${StyledLinksContainer} {
    grid-area: links;
    display: flex;
    justify-content: space-around;
    align-items: center;

    & button {
      border: 0;
      padding: 0.7em 1.3em;
      border-radius: 3px;
      color: ${theme.colors.white};
      background-color: ${theme.colors.teal};
      transition: 0.2s ease-in-out;

      &:hover,
      &:focus,
      &:active {
        background: ${theme.colors.lightTeal};
        cursor: pointer;
      }
    }
  
@media (max-width: 375px) {

    border: 2px solid red;
    grid-template-columns: 1fr;
    grid-template-areas:
    'logo'
    'search'
    'links'
  }

  }
`;

function Navbar() {
  return (
    <StyledNavbar>
      <StyledLogoContainer>
        <NavLink to="/">
          <ReactLogo style={{ height: '40px', marginLeft: '10px' }} />
        </NavLink>
      </StyledLogoContainer>

      <StyledSearchContainer>
        <SearchBar className='searchBar' />
      </StyledSearchContainer>

      <StyledLinksContainer>
        <NavLink to="login">
          <p>Sign In</p>
        </NavLink>
      </StyledLinksContainer>
    </StyledNavbar>
  );
}

export default Navbar;
