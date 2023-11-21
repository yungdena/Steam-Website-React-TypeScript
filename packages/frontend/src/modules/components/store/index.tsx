import { Header } from '../header';
import { Footer } from '../home/footer';
import { HomepageHeader } from '../home/home-header';
import { AppList } from './app-list';
import { Container, MainContent, StoreWrap } from './index.styled';
import { StoreMenu } from './store-menu';

export const StorePage = () => (
  <Container>
    <Header />
      <MainContent>
        <HomepageHeader />
        <StoreWrap>
          <AppList sliceIndex={null} minHeight="100vh" margin='0' />
          <StoreMenu />
        </StoreWrap>
      </MainContent>
    <Footer />
  </Container>
);

