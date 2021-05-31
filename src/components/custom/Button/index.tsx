import React, { CSSProperties, ReactNode } from "react";
import "./style.css";

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({ children, style, onClick, className }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
  };
  return (
    <button
      style={style}
      onClick={handleClick}
      className={`btn-container ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
