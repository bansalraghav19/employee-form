import React, { useRef, useLayoutEffect } from "react";
import usePrevious from "./../../../hooks/usePrevious";

export interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

const SingleOTPInputComponent: React.FC<SingleOTPInputProps> = (props) => {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <input
      className="input-box"
      type="password"
      maxLength={1}
      ref={inputRef}
      {...rest}
      required
    />
  );
};

export default React.memo(SingleOTPInputComponent);
