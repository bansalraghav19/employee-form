import React, { useRef } from "react";
import "./style.css";

interface Props {
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (id: string) => void;
  className?: string;
  focus?: boolean;
  tabIndex?: number;
}

const Radio: React.FC<Props> = ({
  value,
  name,
  onChange,
  className,
  checked,
  focus,
  tabIndex,
}) => {
  const radioRef = useRef<HTMLInputElement>(null);
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(value as string);
    }
  };
  const handleKeyBoard = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (typeof onChange === "function" && event.key === "Enter") {
      onChange(value as string);
    }
  };
  return (
    <div className={`radio-container ${className}`}>
      <label htmlFor={value} className="radio-label">
        {value}
      </label>
      <input
        tabIndex={-1}
        type="radio"
        id={value}
        name={name}
        ref={radioRef}
        value={value}
        className="radio-button"
        onChange={handleChange}
        checked={checked || false}
      />
      <span tabIndex={0} onKeyPress={handleKeyBoard} className="tabber"></span>
    </div>
  );
};

export default React.memo(Radio);
