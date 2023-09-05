import styled from "styled-components";
import { COLORS } from "../theme";

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${COLORS.storeBlue};
  margin-top: 6rem;
  padding: 0 10rem;

  .main-property {
    max-width: 1640px !important;
    min-height: 6rem;
    background-color: ${COLORS.darkBlueGrey};
    border: 1px solid ${COLORS.tagBlue};
  }
`;

export const PropertyContainer = styled.div`
  display: flex;
  max-width: 1440px;
  min-height: 5rem;
  width: 100%;
  background-color: ${COLORS.darkBlueGrey};
  margin-top: 2rem;
  border: 1px solid ${COLORS.greyishWhite}
`

export const PropertyTitle = styled.div`
  color: ${COLORS.white};
  font-size: 24px;
  padding: 1rem;
`

export const PropertyInput = styled.input`
  all: unset;
  padding-left: 1rem;
  color: ${COLORS.white};
  background-color: ${COLORS.storeBlue};
  border: 1px solid ${COLORS.lightGrey};
  height: 2rem;
  width: 420px;
  margin: 1rem 5rem;
`

export const Button = styled.div`
  background: linear-gradient(to right, #47bfff 5%, #1a44c2 60%);
  background-position: 25%;
  background-size: 330% 100%;
  color: white;
  text-align: center;
  font-size: 1.25rem;
  width: 16.875rem;
  height: 3.125rem;
  padding: 3px 50px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  margin-top: 1.5rem;
  font-weight: 500;

  :hover {
    background: linear-gradient(to right, #47bfff 1%, #1a44c2 70%);
  }
`;