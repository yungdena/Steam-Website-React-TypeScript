import React, { useEffect, useState } from 'react';

import { ContentContainer, AppsList, AppContainer, AppImage, AppImageContainer, AppTitle, AppTextContainer, AppPrice } from './index.styled';
import { useGetAllApps } from '../../common/services/apps.service';
import { IApp } from '../../common/types/app.interface';

export const HomePageContent = () => {
  const [apps, setApps] = useState<IApp[]>([]);
  const getAllAppsMutation = useGetAllApps();

  useEffect(() => {
    async function fetchAllApps() {
      const data = await getAllAppsMutation.mutateAsync();
      console.log('response on front: ', data);
      setApps(data);
    }
    fetchAllApps();
  }, []);

  console.log('apps: ', apps)

  return (
    <ContentContainer>
      <AppsList>
        {apps.map((app) => (
          <AppContainer>
            <AppImageContainer>
              <AppImage src={app.bannerImage} />
            </AppImageContainer>
            <AppTextContainer>
              <AppTitle>{app.title}</AppTitle>
              <AppPrice>
                {app.price}
                {app.price === "Free to Play" ? "" : "$"}
              </AppPrice>
            </AppTextContainer>
          </AppContainer>
        ))}
      </AppsList>
    </ContentContainer>
  );
};
