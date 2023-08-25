import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { HeaderContainer, Link, ButtonGroup, Image, LinkGroup, HeaderLink, OptionalLinks, DropdownContainer} from './index.styled';
import { APP_KEYS } from '../common/consts';
import { DROPDOWN_DATA, HEADER_LINKS, NAME_DROPDOWN_DATA } from '../common/consts/header-buttons';
import { Dropdown } from './dropdown/dropdown';
import { handleNavigate } from '../common/utils/handleNavigate';
import { getAccount } from '../common/utils/getAccount';
import { IAccount } from '../common/types/Account.interface';
import { Loader } from '../common/loader/loader';

const Logo = "https://res.cloudinary.com/didkbrlcz/image/upload/v1677489737/System/logo_steam_in6blq.svg";

export const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [parsedAccount, setParsedAccount] = useState<IAccount | null>(null); // Use state for account
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchAccount = async () => {
      const account = await getAccount();
      setParsedAccount(account);
      setIsLoading(false);
    };
    fetchAccount();
  }, []);

  const history = useHistory();

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
                <Link
                  onClick={handleNavigate(
                    history,
                    link.link
                  )}
                  id={link.id}
                  key={link.id}
                >
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
        {isLoading ? (
          <Loader></Loader>
        ) : parsedAccount ? (
          <DropdownContainer
            onMouseEnter={() => setHoveredName("name")}
            onMouseLeave={() => setHoveredName(null)}
          >
            <Link>
              {parsedAccount?.name}
              {hoveredName && (
                <Dropdown
                  hoveredLink={hoveredName}
                  linkId={"name"}
                  content={NAME_DROPDOWN_DATA.content}
                />
              )}
            </Link>
          </DropdownContainer>
        ) : (
          <OptionalLinks>
            <HeaderLink
              onClick={handleNavigate(
                history,
                APP_KEYS.ROUTER_KEYS.ROOT + APP_KEYS.ROUTER_KEYS.SIGNIN
              )}
            >
              login
            </HeaderLink>
            <HeaderLink>language</HeaderLink>
          </OptionalLinks>
        )}
      </ButtonGroup>
    </HeaderContainer>
  );
};
