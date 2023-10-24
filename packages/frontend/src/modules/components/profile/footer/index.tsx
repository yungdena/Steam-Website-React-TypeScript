import { ContentContainer, FooterContainer, FooterText, FooterLink, ImageLeft, LowerContainer, UpperContainer } from "./index.styled";
import { FOOTER_LINKS_SIGNIN } from "../../../common/consts/footer-buttons";

const LogoLeft = "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489736/System/footerLogo_valve_e7qtaj.png";

export const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <UpperContainer>
          <ImageLeft src={LogoLeft} />
          <FooterText>
            © Valve Corporation. All rights reserved. All trademarks are
            property of their respective owners in the US and other countries.
            Some geospatial data on this website is provided by geonames.org.
          </FooterText>
        </UpperContainer>
        <LowerContainer>
          {FOOTER_LINKS_SIGNIN.map((link) => {
            return <FooterLink key={link.id}>{link.label}</FooterLink>;
          })}
        </LowerContainer>
      </ContentContainer>
    </FooterContainer>
  );
}