import { BannerMainImage, GameBannerContainer } from "./index.styled";

export const GameBannerComponent = ({ MainImageURL }: { MainImageURL: string }) => {
  return (
    <GameBannerContainer>
      <BannerMainImage src={MainImageURL} />
    </GameBannerContainer>
  );
};