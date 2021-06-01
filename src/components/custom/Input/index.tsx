import React, { useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

// TODO chnage onChnage Interface

interface Props {
  placeholder?: string;
  name: string;
  value?: string;
  className?: string;
  onChange?: any;
  hasError?: boolean;
  errorMessage?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  eRef?: any;
  formValues?: any;
}

const Input: React.FC<Props> = ({ name, className, eRef, formValues }) => {
  const { value, hasError, errorMessage, onChange } = formValues?.[name] || {};
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange instanceof Function) {
      onChange(event?.target?.name, event?.target?.value, "input");
    }
  };

  const handleRef = useCallback((node) => {
    if (node) {
      eRef.current[name] = node;
    }
  }, []);

  return (
    <>
      <div className={`input-container ${className || ""}`}>
        <input
          className={`input ${hasError && "showError"}`}
          ref={handleRef}
          value={value}
          name={name}
          onChange={handleChange}
          autoComplete="off"
        />
        <span className={`underline ${hasError && "error-underline"}`}></span>
        <label className="input-label" htmlFor={name}>
          {name}
        </label>
      </div>
      <div className="error-box mb-20">
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

export default React.memo(Input);
