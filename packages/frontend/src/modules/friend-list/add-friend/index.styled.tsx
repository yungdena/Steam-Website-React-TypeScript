import styled from "styled-components";

export const MainContainer = styled.div`
  width: 920px;
  height: 612px;
  margin-top: 20px;
`

export const Header = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #fff;
  background-color: #015e80;
  padding: 10px 20px 10px 20px;
`;

export const CodeBlockTop = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 20px 20px 20px;
  height: 218px;
`;

export const CodeBlockMid = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px 20px 20px 20px;
  height: 242px;
`;

export const CodeBlockBottom = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20px 20px 20px 20px;
  height: 117px;
`;

export const CodeBlockHeading = styled.div`
  font-size: 17px;
  font-weight: normal;
  line-height: 20px;
  color: #f5f5f5;
  margin-bottom: -7px;
  max-width: 620px;
`;

export const CodeBlockText = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 18px;
  font-weight: normal;
  color: #8f98a0;
  letter-spacing: 0.02em;
  max-width: 620px;
`;

export const CodeBlockInput = styled.input`
  color: #909090;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid #000;
  width: 620px;
  padding-left: 0.5rem;
  border-radius: 3px;
  height: 44px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    font-style: italic;
    font-size: 14px;
  }
`;

export const FriendCode = styled.div`
  background-color: rgba(144, 144, 144, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  min-width: 320px;
  max-width: 620px;
  font-size: 32px;
  line-height: 30px;
  font-weight: normal;
  color: #f5f5f5;
  letter-spacing: .02em;
  padding: 14px;
}
`;