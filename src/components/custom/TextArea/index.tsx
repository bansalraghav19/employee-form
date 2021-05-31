import React from "react";
import "./style.css";

interface Props {
  placeholder?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textAreaRef?: React.LegacyRef<HTMLTextAreaElement>;
}

const TextArea: React.FC<Props> = ({
  value,
  onChange,
  name,
  className,
  textAreaRef,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof onChange === "function") {
      onChange(event);
    }
  };
  return (
    <div className={`textarea-container ${className}`}>
      <textarea
        className="textarea"
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        ref={textAreaRef}
      ></textarea>
      <span className="underline"></span>
      <label className="textarea-label" htmlFor={name}>
        {name}
      </label>
    </div>
  );
};

export default TextArea;
