import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';

import { MainRouter } from '../navigation';
import * as theme from '../common/theme';
import * as Styled from './app.styled';
import '../../style.css';
import { UserDataProvider } from '../common/context/user-context';
import { AppsDataProvider } from '../common/context/apps-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  }
});

const AppContainer = () => (
  <ThemeProvider theme={theme}>
    <Styled.GlobalStyles />
    <QueryClientProvider client={queryClient}>
      <Styled.MainContainer>
        <UserDataProvider>
          <AppsDataProvider>
            <MainRouter />
          </AppsDataProvider>
        </UserDataProvider>
      </Styled.MainContainer>
    </QueryClientProvider>
  </ThemeProvider>
);

export default AppContainer;






