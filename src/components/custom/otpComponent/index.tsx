import React, { useState, useCallback, useEffect } from "react";
import SingleInput from "./otpInput";
import "./style.css";

export interface PropsI {
  length: number;
  name: string;

  formValues?: any;
  autoFocus?: boolean;
  isNumberInput?: boolean;
}

const OTPComponent: React.FC<PropsI> = (props) => {
  const { length, isNumberInput, autoFocus, name, formValues, ...rest } = props;
  const { onChange, hasError } = formValues[name] || {};

  const [activeInput, setActiveInput] = useState<number>(0);
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(""));

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join("");
      if (onChange instanceof Function) onChange(name, otpValue, "OTP");
    },
    [onChange]
  );

  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : "";
    },
    [isNumberInput]
  );

  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || "";
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case " ": {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  return (
    <div className={`otp-container ${hasError ? "error-line" : ""}`} {...rest}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <SingleInput
            key={`SingleInput-${index}`}
            focus={activeInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={autoFocus}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
          />
        ))}
    </div>
  );
};

export default React.memo(OTPComponent);
