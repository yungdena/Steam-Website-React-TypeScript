import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoaderBig } from "../common/loader/loader";

import { useGetAppById } from "../common/services/apps.service";
import { IApp } from "../common/types/app.interface";
import { Header } from "../header";
import { AdditionalInfoContainer, Tag, AdditionalInfoDescription, AdditionalInfoDescriptionColumn, AdditionalInfoTitle, AdditionalInfoTitleColumn, AppTitle, BigInfoContainer, ImageContainer, InfoContainer, InfoWrapper, PageContainer, SmallInfoContainer, SmallInfoTextContainer, TagsContainer, TitleImage, Tags } from "./index.styled";
import { ImageSlider } from "./swiper";

interface AppRouteParams {
  id: string;
}

export const AppPage = () => {
  const [app, setApp] = useState<IApp>()
  const [isLoading, setIsLoading] = useState(true);
  const getAppByIdMutation = useGetAppById()

  const { id } = useParams<AppRouteParams>()
  console.log(id)

  useEffect(() => {
    async function fetchById() {
      const data = await getAppByIdMutation.mutateAsync(id);
      console.log("response on front: ", data);
      setApp(data);
      setIsLoading(false);
    }
    fetchById();
  }, []);

  return (
    <PageContainer>
      <Header />
      <InfoContainer>
        {isLoading ? (
          <LoaderBig />
        ) : (
          <>
            <AppTitle>{app?.title}</AppTitle>
            <InfoWrapper>
              <BigInfoContainer>
                <ImageSlider images={app?.imagesUrl} />
              </BigInfoContainer>
              <SmallInfoContainer>
                <SmallInfoTextContainer>
                  <ImageContainer>
                    <TitleImage src={app?.titleImage} />
                  </ImageContainer>
                  {app?.description}
                </SmallInfoTextContainer>
                <AdditionalInfoContainer>
                  <AdditionalInfoTitleColumn>
                    <AdditionalInfoTitle>ALL REVIEWS</AdditionalInfoTitle>
                    <AdditionalInfoTitle>RELEASE DATE</AdditionalInfoTitle>
                    <AdditionalInfoTitle>DEVELOPER</AdditionalInfoTitle>
                    <AdditionalInfoTitle>PUBLISHER</AdditionalInfoTitle>
                  </AdditionalInfoTitleColumn>
                  <AdditionalInfoDescriptionColumn>
                    <AdditionalInfoDescription>
                      See The reviews below
                    </AdditionalInfoDescription>
                    <AdditionalInfoDescription>
                      {app?.releaseDate}
                    </AdditionalInfoDescription>
                    <AdditionalInfoDescription>
                      {app?.developer}
                    </AdditionalInfoDescription>
                    <AdditionalInfoDescription>
                      {app?.publisher}
                    </AdditionalInfoDescription>
                  </AdditionalInfoDescriptionColumn>
                </AdditionalInfoContainer>
                <TagsContainer>
                  <AdditionalInfoTitle>
                    Popular user-defined tags for this product:
                  </AdditionalInfoTitle>
                  <Tags>
                    {app?.tags.map((tag) => (
                      <Tag>{tag}</Tag>
                    ))}
                  </Tags>
                </TagsContainer>
              </SmallInfoContainer>
            </InfoWrapper>
          </>
        )}
      </InfoContainer>
    </PageContainer>
  );
}