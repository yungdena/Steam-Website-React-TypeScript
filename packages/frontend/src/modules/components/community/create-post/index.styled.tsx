import styled from "styled-components";
import { COLORS } from "../../../common/theme";

export const MainContainer = styled.div`
  position: relative;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  width: 1050px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 1rem;
`

export const Input = styled.input`
  height: 40px;
  color: #909090;
  padding-left: 0.5rem;
  margin-bottom: 1rem
  box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.6666666667);
  border: none;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const StyledTextArea = styled.textarea`
  height: 160px;
  border: 1px solid #233c51;
  border-radius: 3px;
  background-color: #222b35;
  color: #d6d7d8;
  padding: 10px 11px;
  font-size: 13px;
  font-family: "Motiva Sans", Sans-serif;
  font-weight: normal;
  -webkit-box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.5);
  resize: vertical;
`;

export const PreviewImage = styled.img`
  width: 20%;
  margin-top: 0.5rem;
`

export const CreatePostButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 1rem;
  background: linear-gradient(to right, #47bfff 5%, #1a44c2 60%);
  background-position: 25%;
  background-size: 330% 100%;
  color: white;
  text-align: center;
  font-size: 1.25rem;
  width: 23rem;
  height: 3.125rem;
  padding: 3px 20px;
  border-radius: 3px;
  border: none;
  cursor: pointer;

  :hover {
    background: linear-gradient(to right, #47bfff 1%, #1a44c2 70%);
  }
`;