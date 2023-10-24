import { useHistory } from "react-router-dom";
import { useUserData } from "../../../common/context/user-context";

import { DropdownContainer, DropdownLink } from "./dropdown.styled";

export const Dropdown = ({ linkId, hoveredLink, content }: { linkId: string, hoveredLink: string | null, content: {title: string, linkTo: string}[] | undefined }) => {
  const history = useHistory()
  const UserDataContext = useUserData();
  const isHovered = hoveredLink === linkId;

  if (!isHovered) {
    return null;
  }

  const handleNavigate = (route: string) => {
    history.push(route);
  }


  const handleLogOut = (route: string) => {
    UserDataContext?.setUser(null);

    localStorage.removeItem("account");
    sessionStorage.removeItem("account");

    history.push(route);
  };

  const handleItemClick = (item: any) => {
    switch (item.title) {
      case "LOG OUT":
        handleLogOut(item.linkTo);
        break;
      case "FRIENDS":
        handleNavigate(`/friends/${UserDataContext?.userData?._id}`);
        break;
      case "LIBRARY":
        handleNavigate(`/library/${UserDataContext?.userData?._id}`);
        break;
      default:
        handleNavigate(item.linkTo);
    }
    console.log(`Item clicked: ${item.title}`);
  };

    return (
      <DropdownContainer>
        {content &&
          content.map((item) => (
            <DropdownLink key={item.title} onClick={() => handleItemClick(item)}>
              {item.title}
            </DropdownLink>
          ))}
      </DropdownContainer>
    );
};
