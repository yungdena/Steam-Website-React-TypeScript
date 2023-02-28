import { useHistory } from "react-router-dom";

import { DropdownContainer, DropdownLink } from "./dropdown.styled";

export const Dropdown = ({ linkId, hoveredLink, content }: { linkId: string, hoveredLink: string | null, content: {title: string, linkTo: string}[] | undefined }) => {
  const history = useHistory()
  const isHovered = hoveredLink === linkId;

  if (!isHovered) {
    return null;
  }

  const handleNavigate = (route: string) => {
    history.push(route)
  }

  return (
    <DropdownContainer>
      {content && content.map(link => 
        <DropdownLink onClick={() => handleNavigate(link.linkTo)} key={link.title}>{link.title}</DropdownLink>
        )}
    </DropdownContainer>
  );
};
