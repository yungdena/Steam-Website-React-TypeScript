import { Header } from "../header";
import { Container, TextContainer } from "./index.styled";

export const AboutPage = () => {
  return (
    <Container>
      <Header />
      <Container>
        <TextContainer>
          Hello! This is my mock-up version of Steam website.
        </TextContainer>
        <TextContainer>
          P.S. If you have any questions or comments please contact me via email
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
}

