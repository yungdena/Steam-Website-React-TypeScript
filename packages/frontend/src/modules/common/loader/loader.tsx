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
  marginRight?: string;
  marginLeft?: string
}

export const LoaderBig: React.FC<ILoader> = ({ marginTop, marginBottom, marginRight, marginLeft }) => {
  return (
    <LoaderContainerBig
      marginBottom={marginBottom}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      className="loader-big"
    >
      <SpinnerBig className="spinner-big" />
    </LoaderContainerBig>
  );
};