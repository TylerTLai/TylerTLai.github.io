import React from 'react';
import styled from 'styled-components';
import { RiArrowLeftSLine } from 'react-icons/ri';
import theme from '../../styles/theme';

const { colors, fontSizes } = theme;

const StyledPrevArrow = styled.button`
  background: rgba(0,0,0,0);
  border: 0;
  left: -1rem;
  padding: 0;
  position: absolute;
  top: 40%;
  z-index: 1;

  & ${'.prevArrow'} {
    align-items: center;
    background: ${colors.transparentBlack};
    border: 5px solid ${colors.transparentWhite};
    border-radius: 5px;
    color: ${colors.white};
    display: flex;
    font-size: 50px;
    height: 100px;
    justify-content: center;
  }


  @media(max-width: 600px) {
    padding-right: 15px;
    width: 3rem;
    height: 80px;
    font-size: 3rem;
  }
`;

function PrevArrow({ className, style, onClick }) {
  return (
    <StyledPrevArrow
      className={'slick-arrow'}
      onClick={onClick}
      style={{ ...style }}
    >
      <RiArrowLeftSLine className='prevArrow' />
    </StyledPrevArrow>
  );
}

export default PrevArrow;
