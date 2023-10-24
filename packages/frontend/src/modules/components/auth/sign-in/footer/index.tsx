import { useHistory } from "react-router-dom";

import { ContentContainer, FooterContainer, FooterText, FooterTextBig, FooterLink, Button, Image, ImageLeft, LowerContainer, UpperContainer, JoinSteamContainer, LeftSide, FooterLinkBig, RightSide } from "./index.styled";
import { FOOTER_LINKS_SIGNIN } from "../../../../common/consts/footer-buttons";
import { APP_KEYS } from "../../../../common/consts";

const LogoLeft = "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489736/System/footerLogo_valve_e7qtaj.png";
const JoinIcon = "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489744/System/join_pc_ibtg7h.png";

export const Footer = () => {
  const history = useHistory()
  const handleNavigate =
    (route: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log("navigate");
      event.preventDefault();

      history.push(route);
    };

  return (
    <FooterContainer>
      <ContentContainer>
        <JoinSteamContainer>
          <LeftSide>
            <FooterTextBig>
              Join Steam and discover thousands of games to play.
            </FooterTextBig>
            <FooterLinkBig>Learn More</FooterLinkBig>
          </LeftSide>
          <Image src={JoinIcon} />
          <RightSide>
            <Button>
              <FooterLinkBig
                onClick={handleNavigate(APP_KEYS.ROUTER_KEYS.SIGNUP)}
              >
                Join Steam
              </FooterLinkBig>
            </Button>
            <FooterTextBig>It's free and easy to use</FooterTextBig>
          </RightSide>
        </JoinSteamContainer>
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