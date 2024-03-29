import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import { SIGNUP_INPUTS_1, SIGNUP_INPUTS_2 } from '../../../common/consts/authInfo';
import { signUpValidationSchema } from '../../../common/utils/validation';
import { useSignUp } from '../../../common/services/auth.service';
import { Header } from '../../header';
import { Footer } from './footer';
import { countryList } from '../../../common/consts/countries';
import { APP_KEYS } from '../../../common/consts';

import {
  Form,
  TitleContainer,
  Title,
  FormControl,
  Input,
  ButtonRow,
  Button,
  Label,
  Container,
  Select,
  CheckboxControl,
  Checkbox,
  ErrorMessage
} from './index.styled';
import AppContainer from '../../../app';
import { Loader } from '../../../common/loader/loader';
import { useUserData } from '../../../common/context/user-context';

const COUNTRY_API_URL = "https://get.geojs.io/v1/ip/country.json";

export const SignUp: React.FC = () => {
  const history = useHistory();
  const signUpMutation = useSignUp();
  const [country, setCountry] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [isSignedEmail, setIsSignedEmail] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [trueEmail, setTrueEmail] = useState(true);
  const UserDataContext = useUserData();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const formik: any = useFormik<{
    email: "";
    password: "";
    confirmPassword: "";
    country: "";
    confirmEmail: "";
    name: "";
  }>({
    initialValues: {
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      country: "",
      name: ""
    },
    validationSchema: signUpValidationSchema,
    onSubmit: () => {},
  });

  const fetchCountry = async () => {
    const response = await fetch(COUNTRY_API_URL);
    const { name } = await response.json();

    const selectedCountry = name;
    if (selectedCountry) {
      setCountry(selectedCountry);
      formik.setFieldValue("country", selectedCountry);
    }
  };

  const isValid =
    isChecked &&
    !isLoading &&
    !formik.errors.email &&
    !formik.errors.password &&
    formik.touched.password &&
    !formik.errors.name &&
    formik.touched.name &&
    !formik.errors.confirmPassword &&
    formik.touched.confirmPassword;

  useEffect(() => {
    fetchCountry()
  }, []);

  const handleSigned = () => {
    const { email, confirmEmail } = formik.values;
    if (!formik.errors.email && !formik.errors.confirmEmail && formik.touched.email && formik.touched.confirmEmail) {
      if (email === confirmEmail) {
        if (isChecked) {
          setIsSignedEmail(true);
        }
      } else {
        setTrueEmail(false);
      }
      
    }
  };

  const handleAuthorized = async (route: string) => {
    const { email, name, password, country, confirmPassword } = formik.values;
    setIsLoading(true);

    try {
      const user = await signUpMutation.mutateAsync({
        email,
        name,
        password,
        country,
      });

      if (!user.message) {
        UserDataContext?.setUser(user, true);
  
        localStorage.setItem(
          APP_KEYS.STORAGE_KEYS.ACCOUNT,
          JSON.stringify(user._id)
        );
  
        if (isValid && confirmPassword === password) {
          history.push(route);
        }
      }
      if (user.message) {
        const errorMessage = user.message;

        if (errorMessage === "Email is already in use") {
          setTrueEmail(true)
          setIsSignedEmail(false);
          formik.setFieldError("email", "Email is already in use");
        } else if (errorMessage === "Username is already taken") {
          formik.setFieldError("name", "Username is already taken");
        }
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header />
      {isSignedEmail ? (
        <Form>
          <TitleContainer>
            <Title>CREATE &nbsp;YOUR ACCOUNT</Title>
          </TitleContainer>
          {formik.errors.name && formik.touched.name && (
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          )}
          {formik.values.confirmPassword !== formik.values.password &&
            formik.touched.confirmPassword &&
            formik.touched.password && (
              <ErrorMessage>
                Please make sure that your passwords are identical
              </ErrorMessage>
            )}
          {SIGNUP_INPUTS_2.map((input) => (
            <FormControl key={input.id}>
              <Label>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                key={input.id}
              />
            </FormControl>
          ))}
          <Button
            disabled={!isValid}
            onClick={async (event) => {
              event.preventDefault();
              await handleAuthorized(APP_KEYS.ROUTER_KEYS.HOME);
            }}
          >
            {isLoading ? <Loader /> : "Done"}
          </Button>
        </Form>
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          {(!trueEmail || !isChecked || (formik.errors.email && formik.touched.email) ) && (
            <ErrorMessage>
              {formik.touched.email && formik.errors.email ? (
                <span>{formik.errors.email}</span>
              ) : null}
              {!trueEmail &&
                "Please enter the same address in both email address fields."}
              <br />
              {!isChecked &&
                "You must agree to the Steam Subscriber Agreement to continue."}
            </ErrorMessage>
          )}
          <TitleContainer>
            <Title>CREATE &nbsp;YOUR ACCOUNT</Title>
          </TitleContainer>
          {SIGNUP_INPUTS_1.map((input) => (
            <FormControl key={input.id}>
              <Label>{input.label}</Label>
              <Input
                type={input.type}
                id={input.id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                key={input.id}
              />
            </FormControl>
          ))}
          <FormControl>
            <Label>Country of Residence</Label>
            <Select
              id="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            >
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </FormControl>
          <CheckboxControl>
            <Checkbox
              type="checkbox"
              id="checkbox"
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            <Label htmlFor="checkbox">
              I am 13 years of age or older and agree to the terms of the Steam
              Subscriber Agreement and the Valve Privacy Policy.
            </Label>
          </CheckboxControl>
          <ButtonRow>
            <Button disabled={!isChecked} onClick={handleSigned} type="submit">
              Continue
            </Button>
          </ButtonRow>
        </Form>
      )}
      <Footer />
    </Container>
  );
};
