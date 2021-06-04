import React from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

interface Props {
  value?: string;
  name: string;
  checked?: boolean;
  onChange?: (fieldName: string, id: string) => void;
  children?: JSX.Element | string;
  values?: string;
  hasError?: boolean;
  errorMessage?: string;
  formValues?: any;
}

const CheckBox: React.FC<Props> = ({ name, values, formValues }) => {
  const { value, onChange, hasError, errorMessage } = formValues[name] || {};
  const handleChange = () => {
    if (onChange instanceof Function) {
      onChange(name as string, value ? "" : (values as string), "CHECKBOX");
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
      <CSSTransition
        in={hasError || false}
        timeout={500}
        classNames="fade-in"
        unmountOnExit
      >
        <div className="error-box">
          <div className="error">{errorMessage}</div>
        </div>
      </CSSTransition>
    </>
  );
};

export default React.memo(CheckBox);
