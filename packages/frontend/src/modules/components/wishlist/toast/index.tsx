import { useState, useEffect } from "react";
import { ToastContainer } from "./index.styled";

const Toast = ({ message, onClose }: any) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? <ToastContainer>{message}</ToastContainer> : null;
};

export default Toast;
