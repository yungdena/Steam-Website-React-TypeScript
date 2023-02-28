import React from 'react';
import { Header } from '../header';
import { HomePageContent } from './container/home-page-container';
import { Container } from './index.styled';

export const HomePage = () => (
  <Container>
    <Header />
    <HomePageContent />
  </Container>
);

