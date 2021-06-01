import React from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

interface Props {
  value?: string;
  name?: string;
  checked?: boolean;
  onChange?: (fieldName: string, id: string) => void;
  children?: JSX.Element | string;
  values?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const CheckBox: React.FC<Props> = ({
  value,
  name,
  onChange,
  checked,
  children,
  values,
  hasError,
  errorMessage,
}) => {
  const handleChange = () => {
    if (onChange instanceof Function) {
      onChange(name as string, value ? "" : (values as string));
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (onChange instanceof Function && event.key === "Enter") {
      onChange(name as string, value ? "" : (values as string));
    }
  };
  return (
    <>
      <div className="checkbox-container">
        <div className="checkbox-box">
          <input
            type="checkbox"
            id={name}
            name={name}
            value={values}
            className="checkbox-button"
            onChange={handleChange}
            checked={value !== ""}
            onKeyPress={handleKeyPress}
          />
          <div className="pseudo-box"></div>
        </div>
        <label htmlFor={name} className="checkbox-label">
          {values}
        </label>
      </div>
      <div className="error-box mb-30">
        <CSSTransition
          in={hasError || false}
          timeout={300}
          classNames="fade-in"
          unmountOnExit
        >
          <div className="error">{errorMessage}</div>
        </CSSTransition>
      </div>
    </>
  );
};

export default React.memo(CheckBox);
