import styled from 'styled-components';
import { COLORS } from '../theme';

export const HeaderContainer = styled.header`
  top: 0;
  left: 0;
  height: 6.5rem;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.darkBlueGrey};
  width: 100%;
  padding: 0 2.25rem 0 3.125rem;
`;

export const ButtonGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 58.75rem;
  height: 100%;
`;

export const LinkGroup = styled.div`
  display: flex;
`

export const Link = styled.button`
  border: none;
  color: ${COLORS.lightGrey};
  border-radius: 0.25rem;
  background-color: transparent;
  text-transform: uppercase;
  font-size: 0.875rem;
  cursor: pointer;

  :hover {
    color: ${COLORS.white};
  }
`;

export const HeaderLink = styled.button`
  border: none;
  color: ${COLORS.lightGrey};
  border-radius: 0.25rem;
  background-color: transparent;
  font-size: 0.7rem;
  cursor: pointer;
  padding: 0;

  :hover {
    color: ${COLORS.white};
  }

  &:first-child::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 3.5rem;
    transform: translateY(-50%);
    height: 0.75rem;
    width: 1px;
    background-color: ${COLORS.lightGrey};
  }
`;

export const OptionalLinks = styled.div`
  top: 0.5rem;
  right: 5rem;
  position: absolute;
  display: flex;
  gap: 1rem;
`;


export const Image = styled.img`
  width: 11rem;
  height: 2.75rem;
  margin-right: 2.25rem;
`;

export const DropdownContainer = styled.div`
  position: relative;
`