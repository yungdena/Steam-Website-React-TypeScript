import { useHistory } from "react-router-dom";

import { DropdownContainer, DropdownLink } from "./dropdown.styled";

export const Dropdown = ({ linkId, hoveredLink, content }: { linkId: string, hoveredLink: string | null, content: {title: string, linkTo: string}[] | undefined }) => {
  const history = useHistory()
  const isHovered = hoveredLink === linkId;

  if (!isHovered) {
    return null;
  }

  const handleNavigate = (route: string) => {
    history.push(route);
  }

  const handleLogOut = (route: string) => {
    localStorage.removeItem("account");
    sessionStorage.removeItem("account");
    history.push(route);
    window.location.reload();
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
