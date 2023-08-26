import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ContentContainer, AppsList, AppContainer, AppImage, AppImageContainer, AppTitle, AppTextContainer, AppPrice, AppLink } from './index.styled';
import { useGetAllApps } from '../../common/services/apps.service';
import { IApp } from '../../common/types/app.interface';
import { APP_KEYS } from '../../common/consts';

export const AppList = () => {
  const [apps, setApps] = useState<IApp[]>([]);
  const history = useHistory()
  const getAllAppsMutation = useGetAllApps();

  const handleNavigate = (appId: string) => {
    history.push(
      `${APP_KEYS.ROUTER_KEYS.ROOT}${APP_KEYS.ROUTER_KEYS.APPS}/${appId}`
    );
  }

  useEffect(() => {
    async function fetchAllApps() {
      const data = await getAllAppsMutation.mutateAsync();
      console.log("response on front: ", data);
      setApps(data);
    }
    fetchAllApps();
  }, []);

  console.log('apps: ', apps)

  return (
    <ContentContainer>
      <AppsList>
        {apps.map((app) => (
          <AppLink key={app._id} onClick={() => handleNavigate(app._id)}>
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
          </AppLink>
        ))}
      </AppsList>
    </ContentContainer>
  );
};
