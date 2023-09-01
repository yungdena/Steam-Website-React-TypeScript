import React from 'react'
import { LoaderContainer, LoaderContainerBig, Spinner, SpinnerBig } from './loader.styled'

export const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  );
};

export const LoaderBig: React.FC = () => {
  return (
    <LoaderContainerBig>
      <SpinnerBig />
    </LoaderContainerBig>
  );
};