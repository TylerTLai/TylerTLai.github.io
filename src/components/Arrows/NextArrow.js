import React from 'react';
import styled from 'styled-components';
import { RiArrowRightSLine } from 'react-icons/ri';
import theme from '../../styles/theme';

const { colors, fontSizes } = theme;

const StyledNextArrow = styled.button`
  background: rgba(0,0,0,0);
  border: 0;
  padding: 0;
  position: absolute;
  right: -1rem;
  top: 40%;
  z-index: 1;

  & ${'.nextArrow'} {
    align-items: center;
    background: ${colors.transparentBlack};
    border: 5px solid ${colors.transparentWhite};
    border-radius: 5px;
    color: ${colors.white};
    display: flex;
    font-size: 50px;
    height: 100px;
    justify-content: center;

  @media(max-width: 600px) {
    
    
    & ${'.nextArrow'} {
      color: red;
    }
  }

  
  }

`;

function NextArrow({ className, style, onClick }) {
  return (
    <StyledNextArrow
      className={'slick-arrow'}
      onClick={onClick}
      style={{ ...style }}
    >
      <RiArrowRightSLine className='nextArrow' />
    </StyledNextArrow>
  );
}

export default NextArrow;
