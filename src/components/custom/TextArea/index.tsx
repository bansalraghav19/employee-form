import React, { useCallback } from "react";
import "./style.css";

interface Props {
  placeholder?: string;
  name: string;
  className?: string;
  eRef?: any;
  formValues?: any;
}

const TextArea: React.FC<Props> = ({ formValues, name, className, eRef }) => {
  const { onChange, value } = formValues[name] || {};
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event.target.name, event.target.value, "TEXTAREA");
    }
  };

  const handleRef = useCallback((node) => {
    if (node) {
      eRef.current[name as string] = node;
      console.log(eRef);
    }
  }, []);

  return (
    <div className={`textarea-container ${className}`}>
      <textarea
        className="textarea"
        defaultValue={value}
        name={name}
        id={name}
        onChange={handleChange}
        ref={handleRef}
        required
      ></textarea>
      <span className="underline"></span>
      <label className="textarea-label" htmlFor={name}>
        {name}
      </label>
    </div>
  );
};

export default React.memo(TextArea);
