import { Header } from "../header";
import { Container, TextContainer } from "./index.styled";

export const AboutPage = () => (
  <Container>
    <Header />
    <Container>
      <TextContainer>
        Hello! This is my mock-up version of Steam website.
      </TextContainer>
      <TextContainer>
        I've used a lot of different technologies and libraries to copy visual
        and functionality of original website. Hope you enjoy using my project
        and I would like to be applied :D
      </TextContainer>
      <br />
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
