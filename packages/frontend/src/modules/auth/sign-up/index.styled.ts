import styled from 'styled-components';

import { COLORS } from '../../theme/colors.const';
import { SIZES } from '../../theme/fonts.const';

const { l, m, ms } = SIZES;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 11rem 10rem;
  width: 58.75rem;
  height: 58.75rem;
  margin: 0 auto;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  width: 18.25rem;
`;

export const Input = styled.input`
  font-size: ${m};
  width: 19rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: ${COLORS.grey};
  color: ${COLORS.white};

  ::placeholder {
    color: ${COLORS.grey};
    font-size: ${ms};
  }

  input:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: -internal-light-dark(
      rgb(232, 240, 254),
      rgba(70, 90, 126, 0.4)
    ) !important;
    color: fieldtext !important;
  }
`;

export const Select = styled.select`
  font-size: ${m};
  width: 19rem;
  padding: 0.375rem 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: ${COLORS.grey};
  color: ${COLORS.white};

  ::placeholder {
    color: ${COLORS.grey};
    font-size: ${ms};
  }

  option {
    color: ${COLORS.white};
  }
`;

export const Button = styled.button`
  background: linear-gradient(to right, #47bfff 5%, #1a44c2 60%);
  background-position: 25%;
  background-size: 330% 100%;
  color: white;
  text-align: center;
  font-size: ${m};
  width: 10rem;
  height: 2rem;
  padding: 3px 50px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  margin-top: 1.5rem;

  :hover {
    background: linear-gradient(to right, #47bfff 1%, #1a44c2 70%);
  }
`;

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${ms};
`;

export const ButtonRow = styled.div`
  margin-top: 1.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

export const Title = styled.p`
  font-size: 2.125rem;
  color: ${COLORS.white};
  letter-spacing: 2px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: ${COLORS.lightGrey};
`;

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(
        30% 40% at 40% 30%,
        rgba(33, 36, 41, 0.5) 0%,
        rgba(33, 36, 41, 0) 100%
      )
      no-repeat,
    url("https://store.akamai.steamstatic.com/public/shared/images/joinsteam/acct_creation_bg.jpg") -20vw
      0 no-repeat,
    #212429;
  @media (max-width: 1440px) {
    background-position: -35vw 0;
  }
  @media (min-width: 1800px) {
    background-position: -15vw 0;
  }
`;

export const ErrorMessage = styled.div``
export const SignInLink = styled.div``;

export const CheckboxControl = styled.div`
  color: ${COLORS.lightGrey}
`

export const Checkbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
`;