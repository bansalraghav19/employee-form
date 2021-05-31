import React from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

interface Props {
  placeholder?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}

const Input: React.FC<Props> = ({
  value,
  onChange,
  name,
  className,
  hasError,
  errorMessage,
  inputRef,
}) => {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange instanceof Function) {
      onChange(event);
    }
  };

  return (
    <>
      <div className={`input-container ${className}`}>
        <input
          className={`input ${hasError && "showError"}`}
          ref={inputRef}
          value={value}
          onChange={handleChange}
        />
        <span className={`underline ${hasError && "error-underline"}`}></span>
        <label className="input-label" htmlFor={name}>
          {name}
        </label>
      </div>
      <div className="error-box">
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

export default Input;
