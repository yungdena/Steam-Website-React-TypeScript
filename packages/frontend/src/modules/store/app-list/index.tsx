import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ContentContainer, AppsList, AppContainer, AppImage, AppImageContainer, AppTitle, AppTextContainer, AppPrice, AppLink } from './index.styled';
import { PriceContainer, PriceAmounts, PricePercent, OriginalPrice, FinalPrice } from '../../home/offers/index.styled';
import { useGetAllApps } from '../../common/services/apps.service';
import { IApp } from '../../common/types/app.interface';
import { APP_KEYS } from '../../common/consts';
import { calculatePercentageDecrease } from '../../common/utils/countPercentage';

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
                {!app.newPrice && (
                  <AppPrice>
                    {app.price}
                    {app.price === "Free to Play" ? "" : "$"}
                  </AppPrice>
                )}
                {app.newPrice && (
                  <PriceContainer>
                    <PricePercent>
                      {calculatePercentageDecrease(
                        Number(app.price),
                        Number(app.newPrice),
                        0
                      )}
                      %
                    </PricePercent>
                    <PriceAmounts>
                      <OriginalPrice>{app.price}$</OriginalPrice>
                      <FinalPrice>{app.newPrice}$</FinalPrice>
                    </PriceAmounts>
                  </PriceContainer>
                )}
              </AppTextContainer>
            </AppContainer>
          </AppLink>
        ))}
      </AppsList>
    </ContentContainer>
  );
};
