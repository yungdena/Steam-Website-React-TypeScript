import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HOME_HEADER_LINKS } from "../../common/consts/header-buttons";
import {
  HomeHeader,
  LinkGroup,
  SearchBarWrap,
  SearchBarContainer,
  SearchBar,
  SearchButton,
  Link,
} from "./index.styled";

export const HomepageHeader = ({ onSearch }: any) => {
  const history = useHistory();
  const SearchButtonURL =
    "https://res.cloudinary.com/didkbrlcz/image/upload/v1693034230/System/search_icon_btn_r7rp8b.png";
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e: any) => {
    const { value } = e.target;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSearchButtonClick = () => {
    onSearch(searchQuery);
    history.push(`/store?search=${searchQuery}`);
  };

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
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <SearchButton
            src={SearchButtonURL}
            onClick={handleSearchButtonClick}
          />
        </SearchBarContainer>
      </SearchBarWrap>
    </HomeHeader>
  );
};
