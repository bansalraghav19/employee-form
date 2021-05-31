import React from "react";
import "./style.css";

interface Props {
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (id: string) => void;
  className?: string;
}

const Radio: React.FC<Props> = ({
  value,
  name,
  onChange,
  className,
  checked,
}) => {
  const handleChange = () => {
    if (typeof onChange === "function") {
      onChange(value as string);
    }
  };
  return (
    <div className={`radio-container ${className}`}>
      <label htmlFor={value} className="radio-label">
        {value}
      </label>
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className="radio-button"
        onChange={handleChange}
        checked={checked || false}
      />
    </div>
  );
};

export default React.memo(Radio);
