import styled from "styled-components";
import { COLORS } from "../theme";
import { Header } from "../header";

export const Support = () => {
  const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.storeBlue};
    padding-top: 6.5rem;
  `;

  const TextContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    color: ${COLORS.white};
    padding: 0.5rem 10rem;
  `;

  return (
    <Container>
      <Header />
      <Container>
        <TextContainer>
          If you experiencing any problems contact me via email
          or Telegram:
        </TextContainer>
        <TextContainer>
          synytsyn.denys@gmail.com
          <br />
          @IkuzoKora (Telegram)
        </TextContainer>
      </Container>
    </Container>
  );
};

