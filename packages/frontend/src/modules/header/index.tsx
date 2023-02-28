import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { HeaderContainer, Link, ButtonGroup, Image, LinkGroup, HeaderLink, OptionalLinks, DropdownContainer} from './index.styled';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { APP_KEYS } from '../common/consts';
import { IAccount } from '../common/types/Account.interface';
import { DROPDOWN_DATA, HEADER_LINKS } from '../common/consts/header-buttons';
import { Dropdown } from './dropdown/dropdown';

const cld = new Cloudinary({
  cloud: {
    cloudName: "didkbrlcz",
  },
}); 

const Logo = "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489737/System/logo_steam_in6blq.svg";


export const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const history = useHistory();

  const handleNavigate = (route: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('navigate')
    event.preventDefault();

    history.push(route);
  };

  const storedAccount = localStorage.getItem('account');
  let parsedAccount: IAccount = { name: '', email: '', password: '' };

  if (storedAccount) {
    parsedAccount = JSON.parse(storedAccount);
  }
  return (
    <HeaderContainer>
      <ButtonGroup>
        <Image src={Logo} />
        <LinkGroup>
          {HEADER_LINKS.map((link) => {
            const isHovered = hoveredLink === link.id;
            return (
              <DropdownContainer
                key={link.id}
                onMouseEnter={() => setHoveredLink(link.id)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link id={link.id} key={link.id}>
                  {link.label}
                </Link>
                {isHovered &&
                  DROPDOWN_DATA.map((dropdown) => {
                    if (link.id === dropdown.id) {
                      return (
                        <Dropdown
                          key={dropdown.id}
                          hoveredLink={hoveredLink}
                          linkId={dropdown.id}
                          content={dropdown.content}
                        />
                      );
                    }
                    return null;
                  })}
              </DropdownContainer>
            );
          })}
        </LinkGroup>
        <OptionalLinks>
          <HeaderLink onClick={handleNavigate(APP_KEYS.ROUTER_KEYS.SIGNIN)}>
            login
          </HeaderLink>
          <HeaderLink>language</HeaderLink>
        </OptionalLinks>
      </ButtonGroup>
    </HeaderContainer>
  );
};
