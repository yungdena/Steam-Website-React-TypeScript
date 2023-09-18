import { useHistory } from "react-router-dom";
import { useUserData } from "../../common/context/user-context";

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

    return (
      <DropdownContainer>
        {content && content.map((item) => (
          <DropdownLink
            key={item.title}
            onClick={
              item.title === "LOG OUT"
                ? () => handleLogOut(item.linkTo)
                : () => handleNavigate(item.linkTo)
            }
          >
            {item.title}
          </DropdownLink>
        ))}
      </DropdownContainer>
    );
};
