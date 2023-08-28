import styled from "styled-components";
import { COLORS } from "../../theme";

const background =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1693083198/background_maincap_2_cp7s3n.jpg";

export const FeaturedTitle = styled.div`
  position: absolute;
  margin: 3rem 0 0 3.5rem;
  align-self: start;
  font-family: "Motiva Sans", Sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.03em;
  font-weight: normal;
  padding-top: 2px;
`;

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

export const GameBannerContainer = styled.div`
  display: flex;
  height: 353px;
  width: 940px;
  margin: 5rem auto;
  box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
`;

export const BannerMainImage = styled.img`
  width: 616px;
  height: 353px;
  transition: opacity 0.3s;
  box-shadow: 10px 0px 10px -5px rgba(0, 0, 0, 0.75);
  z-index: 1000;
`;

export const BannerContent = styled.div`
  position: relative;
  width: 324px;
  height: 353px;

  background-image: url(${background})
`

export const AppTitle = styled.div`
  display: inline-block;
  width: 100%;
  font-size: 24px;
  color: white;
  padding: 1rem 1rem 0 1rem;
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 164px;
`;

export const Image = styled.img`
  width: 162px;
  height: 89px;
  padding: 10px 10px 10px 0;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  margin: 0 0 0 1rem;
`

export const Tag = styled.div`
  display: inline-block;
  padding: 0 7px;
  background-color: rgba(255, 255, 255, 0.2);
  margin-right: 2px;
  border-radius: 2px;
  cursor: pointer;
  margin-bottom: 3px;
  max-width: 200px;
  font-size: 11px;
  color: ${COLORS.greyishWhite};
`;

export const Price = styled.div`
  position: absolute;
  font-size: 11px;
  line-height: 12px;
  padding: 1rem 1rem;
  color: white;
  left: 0;
  bottom: 0;
`;

export const ReasonContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const ReasonBig = styled.div`
  color: ${COLORS.white}
  font-size: 21px;
  font-weight: 200;
  padding: 1rem 0 0 1rem;
`;

export const ReasonSmall = styled.div`
  color: ${COLORS.white}
  font-size: 17px;
  font-weight: 200;
  min-height: auto;
  height: 20px;
  padding: 1rem;
  margin-bottom: 2.5rem;
`;

interface RecommendedProps {
  recommended: boolean;
}

export const Recommended = styled.span<RecommendedProps>`
  font-size: 17px;
  font-weight: 200;
  min-height: auto;
  height: 20px;
  margin-right: 0.5rem;
  color: ${({ recommended }) => (recommended ? COLORS.RecLime : "inherit")};
`;