import styled from "styled-components";
import { Header } from "../header";
import { Footer } from "../home/footer";
import { COLORS } from "../../common/theme";

export const NotFound = () => {
  const MainContainer = styled.div`
    width: 100%;
    height: calc(100vh - 184px);
    background-color: ${COLORS.storeBlue};
    padding-top: 170px;
    padding-left: 170px;
  `;
  
  const Title = styled.div`
    font-size: 32px;
    color: rgba(210, 210, 210, 1);
  `

  return (
    <>
      <Header></Header>
      <MainContainer>
        <Title>Page Not Found</Title>
      </MainContainer>
      <Footer></Footer>
    </>
  )
}
