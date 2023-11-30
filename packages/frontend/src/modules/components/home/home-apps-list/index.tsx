import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { IApp } from "../../../common/types/app.interface";
import { calculateReviewTitle } from "../../../common/utils/calculateReviewRate";
import { calculatePercentageDecrease } from "../../../common/utils/countPercentage";
import { handleNavigateToApp } from "../../../common/utils/handleNavigate";
import { AppLink } from "../../store/app-list/index.styled";
import { AppContainer, AppImage, AppNewPrice, AppOldPrice, AppPrice, AppPriceContainer, AppsLine, AppTags, AppTitle, FeaturedButton, FeaturedTitle, HomeAppsContainer, PricePercent, PriceWrapper, SelectedAppContainer, SelectedAppsImage, SelectedAppsImages, SelectedAppsReviews, SelectedAppsReviewsTitle, SelectedAppsTag, SelectedAppsTags, SelectedAppTitle } from "../index.styled";

export const HomeAppList = ({
  selectedApp,
  appsData,
  handleNavigateToApps,
  handleSelectApp,
}: any) => {
  const history = useHistory()
  return (
    <>
      <AppsLine>
        <FeaturedTitle left="-200px" top="-30px">
          Top Sellers
        </FeaturedTitle>
        <FeaturedButton onClick={handleNavigateToApps}>To apps</FeaturedButton>
      </AppsLine>
      <HomeAppsContainer>
        {appsData.slice(0, 10).map((app: IApp) => (
          <AppLink
            key={app._id}
            onClick={() => handleNavigateToApp(app._id, history)}
            onMouseEnter={() => handleSelectApp(app)}
          >
            <AppContainer
              isSelected={
                selectedApp && selectedApp._id === app._id ? true : false
              }
            >
              <AppImage src={app.bannerImage} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <AppTitle
                  isSelected={
                    selectedApp && selectedApp._id === app._id ? true : false
                  }
                >
                  {app.title}
                </AppTitle>
                <AppTags>
                  {app.tags.map((tag, index) => (
                    <Fragment key={index}>
                      <span>{tag}</span>
                      {index < app.tags.length - 1 && <span>, </span>}
                    </Fragment>
                  ))}
                </AppTags>
              </div>
              {!app.newPrice && (
                <AppPrice
                  isSelected={
                    selectedApp && selectedApp._id === app._id ? true : false
                  }
                >
                  {app.price}
                  {app.price === "Free to Play" ? "" : "$"}
                </AppPrice>
              )}
              {app.newPrice && (
                <PriceWrapper>
                  <PricePercent style={{ marginLeft: "4px" }}>
                    -
                    {calculatePercentageDecrease(
                      Number(app.price),
                      Number(app.newPrice),
                      0
                    )}
                    %
                  </PricePercent>
                  <AppPriceContainer>
                    <AppOldPrice>{app.price}$</AppOldPrice>
                    <AppNewPrice
                      isSelected={
                        selectedApp && selectedApp._id === app._id
                          ? true
                          : false
                      }
                    >
                      {app.newPrice}$
                    </AppNewPrice>
                  </AppPriceContainer>
                </PriceWrapper>
              )}
            </AppContainer>
          </AppLink>
        ))}
        <SelectedAppContainer>
          <SelectedAppTitle>{selectedApp?.title}</SelectedAppTitle>
          <SelectedAppsReviews>
            <SelectedAppsReviewsTitle>
              Overall user reviews:
              <SelectedAppsReviewsTitle
                style={{
                  color: calculateReviewTitle(selectedApp?.reviews).color,
                }}
              >
                {selectedApp?.reviews &&
                  calculateReviewTitle(selectedApp?.reviews).title}
                <span style={{ color: "#c6d4df" }}>
                  {" "}
                  ({selectedApp?.reviews.length})
                </span>
              </SelectedAppsReviewsTitle>
            </SelectedAppsReviewsTitle>
          </SelectedAppsReviews>
          <SelectedAppsTags>
            {selectedApp?.tags.map((tag: string) => (
              <SelectedAppsTag key={tag}>{tag}</SelectedAppsTag>
            ))}
          </SelectedAppsTags>
          <SelectedAppsImages>
            {selectedApp?.imagesUrl.map((image: string) => (
              <SelectedAppsImage key={image} src={image} />
            ))}
          </SelectedAppsImages>
        </SelectedAppContainer>
      </HomeAppsContainer>
    </>
  );
};