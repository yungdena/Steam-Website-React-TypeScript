import { useState } from 'react';
import { useGetAppsByTitle } from '../../common/services/apps.service';
import { IApp } from '../../common/types/app.interface';
import { Header } from '../header';
import { Footer } from '../home/footer';
import { HomepageHeader } from '../home/home-header';
import SearchApps from '../home/search-dropdown';
import { AppList } from './app-list';
import { Container, MainContent, StoreWrap } from './index.styled';
import { StoreMenu } from './store-menu';

export const StorePage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedApps, setSearchedApps] = useState<IApp[] | null>(null);
  const getAppsByTitleMutation = useGetAppsByTitle();
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchedApps(null);
    } else {
      try {
        const response: any = await getAppsByTitleMutation.mutateAsync(query);
        if (Array.isArray(response)) {
          setSearchedApps(response);
        }
      } catch (error) {
        console.error("Error searching apps:", error);
      }
    }
  };

  return (
    <Container>
      <Header />
      <MainContent>
        <HomepageHeader onSearch={handleSearch} />
        <SearchApps right='282px' top="169px" onSmallScreenRight='182px' apps={searchedApps} searchQuery={searchQuery} />
        <StoreWrap>
          <AppList sliceIndex={null} minHeight="100vh" margin="0" />
          <StoreMenu />
        </StoreWrap>
      </MainContent>
      <Footer />
    </Container>
  );
}


