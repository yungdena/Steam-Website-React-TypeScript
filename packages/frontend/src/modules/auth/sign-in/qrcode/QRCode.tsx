import React, { useState, useEffect } from "react";
import { QRCodeContainer } from "./QRCode.styled";
import QRCodeReact from "qrcode.react";

export const QRCode = () => {
  const [qrValue, setQRValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random().toString(36).substring(7);
      setQRValue(newValue);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <QRCodeContainer>
      <QRCodeReact
        value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
        size={160}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"H"}
      />
    </QRCodeContainer>
  );
};
