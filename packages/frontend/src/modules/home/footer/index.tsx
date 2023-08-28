import {
  ContentContainer,
  FooterContainer,
  FooterText,
  FooterLink,
  ImageLeft,
  ImageRight,
  LowerContainer,
  UpperContainer,
} from "./index.styled";
import { FOOTER_LINKS } from "../../common/consts/footer-buttons";

const LogoLeft =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489622/System/footerLogo_valve_new_dpuvgb.png";
const LogoRight =
  "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489624/System/logo_steam_footer_jmchza.png";

export const Footer = () => {
  return (
    <FooterContainer>
      <ContentContainer>
        <UpperContainer>
          <ImageLeft src={LogoLeft} />
          <FooterText>
            © 2023 Valve Corporation. All rights reserved. All trademarks are
            property of their respective owners in the US and other countries.
            VAT included in all prices where applicable.
          </FooterText>
          <ImageRight src={LogoRight} />
        </UpperContainer>
        <LowerContainer>
          {FOOTER_LINKS.map((link) => {
            return <FooterLink key={link.id}>{link.label}</FooterLink>;
          })}
        </LowerContainer>
      </ContentContainer>
    </FooterContainer>
  );
};
