import React, { useState } from "react";
import {
  CustomSelectContainer,
  Option,
  OptionsContainer,
  SelectHeader,
  SortBySpan,
} from "./index.styled";

const options = [
  { id: 1, name: "Default" },
  { id: 2, name: "Name" },
  { id: 7, name: "Release Date" },
  { id: 8, name: "Review Score" },
];

interface CustomSelectProps {
  onChange: (selectedOption: string) => void;
  value: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    onChange(option);
  };

  return (
    <CustomSelectContainer>
      <SelectHeader onClick={() => setIsOpen(!isOpen)}>
        <SortBySpan>Sort By:</SortBySpan> {selectedOption}
      </SelectHeader>
      <OptionsContainer isOpen={isOpen}>
        {options.map((option) => (
          <Option
            key={option.id}
            className={selectedOption === option.name ? "selected" : ""}
            onClick={() => handleOptionClick(option.name)}
          >
            {option.name}
          </Option>
        ))}
      </OptionsContainer>
    </CustomSelectContainer>
  );
};
