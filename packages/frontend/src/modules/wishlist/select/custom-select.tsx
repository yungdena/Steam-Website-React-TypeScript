import React, { useState, useEffect, useRef } from "react";

export const CustomSelect = ({ defaultText, optionsList }: any) => {
  const [showOptionList, setShowOptionList] = useState(false);
  const [selectedText, setSelectedText] = useState(defaultText);
  const selectRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target) &&
        !e.target.classList.contains("selected-text")
      ) {
        setShowOptionList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    setShowOptionList((prevShowOptionList) => !prevShowOptionList);
  };

  const handleOptionClick = (e: any) => {
    setSelectedText(e.target.getAttribute("data-name"));
    setShowOptionList(false);
  };

  return (
    <div className="custom-select-container" ref={selectRef}>
      <div
        className={`selected-text ${showOptionList ? "active" : ""}`}
        onClick={handleListDisplay}
      >
        {selectedText}
      </div>
      {showOptionList && (
        <ul className="select-options">
          {optionsList.map((option: any) => (
            <li
              className="custom-select-option"
              data-name={option.name}
              key={option.id}
              onClick={handleOptionClick}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
