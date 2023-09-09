import { useState } from "react";

import { IApp } from "../../common/types/app.interface";
import { AppTitle, BannerContent, BannerMainImage, FeaturedTitle, GameBannerContainer, GlobalContainer, Image, ImagesContainer, Price, ReasonBig, ReasonContainer, ReasonSmall, Recommended, Tag, TagsContainer } from "./index.styled";

export const GameBannerComponent = ({appInfo}: Partial<IApp>) => {
  const { titleImage, title, imagesUrl, tags, price, reason } = appInfo;
  const [hoveredImage, setHoveredImage] = useState(titleImage);
  const reasonRecommended = reason[0] === 'R'

  return (
    <GlobalContainer>
      <FeaturedTitle>FEATURED & RECOMMENDED</FeaturedTitle>
      <GameBannerContainer>
        <BannerMainImage src={hoveredImage} />
        <BannerContent>
          <AppTitle>{title}</AppTitle>
          <ImagesContainer>
            {imagesUrl.map((imageUrl: string, index: number) => (
              <Image
                key={index}
                src={imageUrl}
                onMouseEnter={() => setHoveredImage(imageUrl)}
                onMouseLeave={() => setHoveredImage(titleImage)}
              />
            ))}
          </ImagesContainer>
          <ReasonContainer>
            {!reasonRecommended && <ReasonBig>{reason}</ReasonBig>}
            {reasonRecommended && (
              <ReasonSmall>
                <Recommended recommended={reasonRecommended}>
                  {reason.split(" ")[0]}
                </Recommended>
                {reason.substring(reason.indexOf(" ") + 1)}
              </ReasonSmall>
            )}
            <TagsContainer>
              {tags.slice(0, 4).map((tag: string) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagsContainer>
          </ReasonContainer>
          <Price>
            {((price !== "Free to Play" || null) && price + "$") || price}
          </Price>
        </BannerContent>
      </GameBannerContainer>
    </GlobalContainer>
  );
};