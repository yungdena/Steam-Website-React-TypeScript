import React from 'react'
import { LoaderContainer, LoaderContainerBig, Spinner, SpinnerBig } from './loader.styled'

export const Loader: React.FC = () => {
  return (
    <LoaderContainer className="loader">
      <Spinner className="spinner" />
    </LoaderContainer>
  );
};

interface ILoader {
  marginTop?: string;
  marginBottom?: string;
}

export const LoaderBig: React.FC<ILoader> = ({ marginTop, marginBottom }) => {
  return (
    <LoaderContainerBig
      marginBottom={marginBottom}
      marginTop={marginTop}
      className="loader-big"
    >
      <SpinnerBig className="spinner-big" />
    </LoaderContainerBig>
  );
};