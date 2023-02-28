import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

import { COLORS } from "../../theme/colors.const";
import { SIZES } from "../../theme/fonts.const";

const { l, m, ms } = SIZES;

export const Form = styled.form`
  width: 100%;
  display: flex;
  padding: 2rem 1.5rem 1.5rem;
  align-items: flex-start;
  margin: 0 auto;
  background-color: ${COLORS.darkBlueGrey};
  border-radius: 4px;
  justify-content: space-between;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  padding-right: 2.5rem;
`;

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: boolean | "" | undefined;
}
export const Input = styled.input<InputProps>`
  font-size: ${m};
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: ${(props) => (props.error ? "1px solid red" : "none")};
  border-radius: 3px;
  background-color: ${COLORS.grey};
  color: ${COLORS.white};
  cursor: pointer;

  ::placeholder {
    color: ${COLORS.grey};
    font-size: ${ms};
  }

  :hover {
    filter: brightness(120%);
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
position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6.5rem;
  width: 100vw;
  height: 41.375rem;
  background: radial-gradient(rgba(24, 26, 33, 0) 0%, #181A21 100%) fixed no-repeat, url(https://community.akamai.steamstatic.com/public/shared/images/joinsteam/new_login_bg_strong_mask.jpg) center top no-repeat, #181A21;
`;

export const CheckboxControl = styled.div`
  height: 1.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  color: ${COLORS.lightGrey};
`;

export const Checkbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  accent-color: ${COLORS.grey};
  background-color: ${COLORS.grey};
  cursor: pointer;

  &:checked {
    background-color: ${COLORS.grey};
    border: 1px solid ${COLORS.blue};
  }

  &:not(:checked):hover {
    filter: brightness(110%);
  }
`;

export const LoginContainer = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 43.75rem;
  height: 27rem;
`;

export const QRCodeField = styled.div`
  display: flex;
  flex-direction: column;
`

export const FieldTitle = styled.div`
  color: ${COLORS.blue};
  font-weight: 500;
  font-size: 0.75rem;
`;

export const QRCodeText = styled.div`
  color: ${COLORS.lightGrey};
  font-size: 0.75rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const FieldText = styled.div`
  font-size: 0.75rem;
  color: ${COLORS.lightGrey}
`

export const FieldLink = styled.div`
  font-size: 0.75rem;
  color: ${COLORS.lightGrey};
  text-decoration: underline;
  margin-top: 3rem;
`;