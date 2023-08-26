import { useState } from "react";

import { IApp } from "../../common/types/app.interface";
import { AppTitle, BannerContent, BannerMainImage, GameBannerContainer, Image, ImagesContainer } from "./index.styled";

export const GameBannerComponent = ({appInfo}: Partial<IApp>) => {
  const { titleImage, title, imagesUrl } = appInfo;
  const [hoveredImage, setHoveredImage] = useState(titleImage);

  return (
    <GameBannerContainer>
      <BannerMainImage
        src={hoveredImage}
      />
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
      </BannerContent>
    </GameBannerContainer>
  );
};