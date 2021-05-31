import React from "react";
import "./style.css";

interface Props {
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (id: string) => void;
}

const CheckBox: React.FC<Props> = ({ value, name, onChange, checked }) => {
  const handleChange = () => {
    if (onChange instanceof Function) {
      onChange(value as string);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (onChange instanceof Function && event.key === "Enter") {
      onChange(value as string);
    }
  };
  return (
    <div className="checkbox-container">
      <div className="checkbox-box">
        <input
          type="checkbox"
          id={value}
          name={name}
          value={value}
          className="checkbox-button"
          onChange={handleChange}
          checked={checked}
          onKeyPress={handleKeyPress}
        />
        <div className="pseudo-box"></div>
      </div>
      <label htmlFor={value} className="checkbox-label">
        {/* {value} */}
      </label>
    </div>
  );
};

export default CheckBox;
