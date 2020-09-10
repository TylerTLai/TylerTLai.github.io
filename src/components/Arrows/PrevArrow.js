import React from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';
import styled from 'styled-components';

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
    border: 3px solid ${colors.transparentWhite};
    border-radius: 5px;
    color: ${colors.white};
    display: flex;
    font-size: ${fontSizes.xl};
    height: 100px;
    justify-content: center;
  }

  @media(max-width: 768px) {
      & ${'.prevArrow'} {
        border: 2px solid ${colors.transparentWhite};
        font-size: ${fontSizes.lg};
        height: 80px;
      }
    }
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
