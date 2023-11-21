import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const MainMenuContainer = styled.div`
  width: 238px;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-left: 1rem;
`

export const FilterContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  min-height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 4px;
`;

export const FilterTitle = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 4px 4px 6px;
  color: #c7d5e0;
  font-size: 12px;
  width: 100%;
`;

export const PriceRangeLabel = styled.label`
  line-height: 28px;
  font-size: 13px;
  width: 90%;
  display: flex;
  justify-content: center;
  color: #9fbbcb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba( 255, 255, 255, 0.1);
`;

export const PriceRangeInput = styled.input`
  width: 90%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  ::-webkit-slider-runnable-track {
    background: #67c1f5;
    max-height: 5px;
    border-radius: 4px;
  }
  ::-moz-range-track {
    background: #67c1f5;
    max-height: 5px;
    border-radius: 4px;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 13px;
    height: 13px;
    background-color: white;
    border-radius: 50%;
    margin-top: -4px;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.75),
      0 0 5px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.75),
      0 0 5px rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.75),
      0 0 5px rgba(0, 0, 0, 0.5);
  }
  ::-moz-range-thumb {
    background: white;
  }
`;

export const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  line-height: 28px;
  font-size: 13px;
  color: #9fbbcb;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95%;
  padding: 0 4px;
  height: 32px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledCheckbox = styled.input`
  background: transparent;
  width: 16px;
  height: 16px;
  margin-right: 10px;
`