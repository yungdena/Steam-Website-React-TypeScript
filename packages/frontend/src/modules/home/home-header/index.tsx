import { HomeHeader, LinkGroup, SearchBarWrap, SearchBarContainer, SearchBar, SearchButton, Link } from "./index.styled";
import { HOME_HEADER_LINKS } from "../../common/consts/header-buttons";

export const HomepageHeader = () => {
  const SearchButtonURL =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1693034230/System/search_icon_btn_r7rp8b.png";
  
    return (
    <HomeHeader>
      <LinkGroup>
        {HOME_HEADER_LINKS.map((link) => {
          return (
            <Link id={link.id} key={link.id}>
              {link.label}
            </Link>
          );
        })}
      </LinkGroup>
      <SearchBarWrap>
        <SearchBarContainer>
          <SearchBar placeholder="search" />
          <SearchButton src={SearchButtonURL} />
        </SearchBarContainer>
      </SearchBarWrap>
    </HomeHeader>
  )
}