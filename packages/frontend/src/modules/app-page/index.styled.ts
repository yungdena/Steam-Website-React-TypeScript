import styled from "styled-components";
import { COLORS } from "../theme";

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${COLORS.storeBlue};
  width: 100%;
  height: 100vh;
`;

export const InfoContainer = styled.div`
  width: 58.75rem;
  height: fit-content;
  padding: 9.5rem 0 2rem;
  background: rgb(27, 40, 56);
  background: linear-gradient(
    180deg,
    rgba(27, 40, 56, 0.1) 21%,
    rgba(12, 19, 27, 0.7) 79%
  );
  border-radius: 0.25rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
`;

export const AppTitle = styled.div`
  width: 100%;
  font-size: 1.625rem;
  color: ${COLORS.white};
`;

export const SmallInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 27.75rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  color: ${COLORS.white};
  font-size: 0.75rem;
  padding-bottom: 1rem;
`;

export const SmallInfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  color: ${COLORS.white};
  font-size: 0.75rem;
`;

export const TitleImage = styled.img`
  width: 100%;
`

export const BigInfoContainer = styled.div`
  width: 38.5rem;
  height: 27rem;
`;

export const AdditionalInfoContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`

export const AdditionalInfoTitleColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > :nth-child(-n + 3) {
    margin-bottom: 0.75rem;
  }

  & > :nth-child(3) {
    margin-bottom: 0;
  }
`;

export const AdditionalInfoDescriptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  & > :nth-child(-n + 3) {
    margin-bottom: 0.75rem;
  }

  & > :nth-child(3) {
    margin-bottom: 0;
  }
`;

export const AdditionalInfoTitle = styled.div`
  color: ${COLORS.urbanGrey}
  font-size: 0.75rem;
`;

export const AdditionalInfoDescription = styled.div`
  color: ${COLORS.blue}
  font-size: 0.75rem;
`;

export const TagsContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`
export const Tags = styled.div`
  display: flex;
  gap: 0.25rem;
`
export const Tag = styled.div`
  font-size: 0.75rem;
  border-radius: 2px;
  width: fit-content;
  color: ${COLORS.tagBlue};
  background-color: rgba(103, 193, 245, 0.2);
  padding: 0.1rem 0.25rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
  }
`;