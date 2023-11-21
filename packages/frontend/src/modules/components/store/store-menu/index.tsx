import { useState } from "react";
import { CheckBoxLabel, FilterContainer, FilterTitle, MainMenuContainer, PriceRangeInput, PriceRangeLabel, StyledCheckbox } from "./index.styled"

export const StoreMenu = () => {
  const [selectedPrice, setSelectedPrice] = useState<string | number>('Free');
  const [includeFree, setIncludeFree] = useState(false);
  const [hideFree, setHideFree] = useState(false)

  const priceOptions = ["Free", 2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, "Any Price"];

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setSelectedPrice(priceOptions[selectedIndex]);
  };

  const renderLabel = () => {
    if (selectedPrice === "Free" || selectedPrice === "Any Price") {
      return selectedPrice;
    } else {
      return `Under ${selectedPrice}$`;
    }
  };

  const handleIncludeFreeChange = () => {
    setIncludeFree(!includeFree);
  };

  const handleHideFreeChange = () => {
    setHideFree(!hideFree);
  };

  return (
    <MainMenuContainer>
      <FilterContainer>
        <FilterTitle>Narrow by Price</FilterTitle>
        <PriceRangeInput
          type="range"
          min={0}
          max={priceOptions.length - 1}
          step={1}
          value={priceOptions.indexOf(selectedPrice)}
          onChange={handlePriceChange}
        />
        <PriceRangeLabel>{renderLabel()}</PriceRangeLabel>
        <CheckBoxLabel>
          <StyledCheckbox
            type="checkbox"
            checked={includeFree}
            onChange={handleIncludeFreeChange}
          />
          Special Offers
        </CheckBoxLabel>
        <CheckBoxLabel>
          <StyledCheckbox
            type="checkbox"
            checked={hideFree}
            onChange={handleHideFreeChange}
          />
          Hide Free to play items
        </CheckBoxLabel>
      </FilterContainer>
    </MainMenuContainer>
  );
};