import styled from "styled-components";
import { COLORS } from "../../theme";

const background =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1693083198/background_maincap_2_cp7s3n.jpg";

export const GameBannerContainer = styled.div`
  display: flex;
  height: 353px;
  width: 940px;
  margin: 5rem auto;
  box-shadow: 0 0 5px 0px #000;
`;

export const BannerMainImage = styled.img`
  width: 616px;
  height: 353px;
  transition: opacity 0.3s;
`;

export const BannerContent = styled.div`
  width: 324px;
  height: 353px;

  background-image: url(${background})
`

export const AppTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 24px;
  color: white;
  height: 69px;
  padding-left: 1rem;
  padding-right: 6px;
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