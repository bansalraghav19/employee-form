import React, { CSSProperties, ReactNode, useCallback } from "react";
import "./style.css";

interface Props {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  eRef?: any;
  name: string;
}

const Button: React.FC<Props> = ({
  children,
  style,
  onClick,
  className,
  eRef,
  name,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
  };
  const handleRefChange = useCallback((node) => {
    if (node && eRef) {
      eRef.current[name] = node;
    }
  }, []);

  return (
    <button
      style={style}
      ref={handleRefChange}
      onClick={handleClick}
      className={`btn-container ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default React.memo(Button);
