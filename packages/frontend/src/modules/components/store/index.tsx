import { Header } from '../header';
import { Footer } from '../home/footer';
import { AppList } from './app-list';
import { Container } from './index.styled';

export const StorePage = () => (
  <Container>
    <Header />
      <AppList sliceIndex={null} minHeight="100vh" margin='0' />
    <Footer />
  </Container>
);

