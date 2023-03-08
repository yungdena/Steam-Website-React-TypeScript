import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetAppById } from "../common/services/apps.service";
import { IApp } from "../common/types/app.interface";
import { Header } from "../header";
import { AppTitle, BigInfoContainer, InfoContainer, InfoWrapper, PageContainer, SmallInfoContainer, SmallInfoTextContainer, TitleImage } from "./index.styled";
import { ImageSlider } from "./swiper";

interface AppRouteParams {
  id: string;
}

export const AppPage = () => {
  const [app, setApp] = useState<IApp>()
  const getAppByIdMutation = useGetAppById()

  const { id } = useParams<AppRouteParams>()
  console.log(id)

  useEffect(() => {
    async function fetchById() {
      const data = await getAppByIdMutation.mutateAsync(id);
      console.log("response on front: ", data);
      setApp(data);
    }
    fetchById();
  }, []);

  return (
    <PageContainer>
      <Header />
      <InfoContainer>
          <AppTitle>
            {app?.title}
          </AppTitle>
          <InfoWrapper>
            <BigInfoContainer>
              <ImageSlider images={app?.imagesUrl} />
            </BigInfoContainer>
            <SmallInfoContainer>
              <SmallInfoTextContainer>
                <TitleImage src={app?.titleImage}/>
                {app?.description}
              </SmallInfoTextContainer>
            </SmallInfoContainer>
          </InfoWrapper>
      </InfoContainer>
    </PageContainer>
  )
}