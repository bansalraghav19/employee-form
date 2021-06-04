import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./style.css";

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
  inputType?: string;
}

const Input: React.FC<Props> = ({
  name,
  className,
  eRef,
  formValues,
  inputType,
}) => {
  const { value, hasError, errorMessage, onChange } = formValues?.[name] || {};
  const [curInputType, setCurInputType] = useState(() => inputType);
  let inputRef: HTMLInputElement | null = null;
  const selectionStart = useRef<number | null>(-1);

  useLayoutEffect(() => {
    if (value) {
      try {
        if (selectionStart?.current === -1)
          selectionStart.current = value.length;
        (inputRef as HTMLInputElement).setSelectionRange(
          selectionStart?.current,
          selectionStart?.current
        );
      } catch (error) {}
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange instanceof Function) {
      selectionStart.current = event.target.selectionStart;
      onChange(event?.target?.name, event?.target?.value, inputType);
    }
  };

  const handleRef = useCallback(
    (node: HTMLInputElement) => {
      if (node) {
        eRef.current[name] = node;
        inputRef = node;
        node?.focus();
      }
    },
    [value]
  );

  const togglePasswordInput = () =>
    setCurInputType(curInputType === "text" ? "password" : "text");

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
          type={curInputType}
        />
        <span className={`underline ${hasError && "error-underline"}`}></span>
        <label className="input-label" htmlFor={name}>
          {name}
        </label>
        {inputType === "password" && (
          <div
            onClick={togglePasswordInput}
            className={`eye ${curInputType === "password" ? "active" : ""}`}
          ></div>
        )}
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
