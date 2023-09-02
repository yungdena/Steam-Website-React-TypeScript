import React from 'react'
import { LoaderContainer, LoaderContainerBig, Spinner, SpinnerBig } from './loader.styled'

export const Loader: React.FC = () => {
  return (
    <LoaderContainer className="loader">
      <Spinner className="spinner" />
    </LoaderContainer>
  );
};

export const LoaderBig: React.FC = () => {
  return (
    <LoaderContainerBig className="loader-big">
      <SpinnerBig className="spinner-big" />
    </LoaderContainerBig>
  );
};