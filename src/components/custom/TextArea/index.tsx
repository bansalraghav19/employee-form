import React, { useCallback } from "react";
import "./style.css";

interface Props {
  placeholder?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: any;
  textAreaRef?: React.LegacyRef<HTMLTextAreaElement>;
  eRef?: any;
}

const TextArea: React.FC<Props> = ({
  value,
  onChange,
  name,
  className,
  eRef,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange instanceof Function) {
      onChange(event.target.name, event.target.value, "text_area");
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
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        ref={handleRef}
      ></textarea>
      <span className="underline"></span>
      <label className="textarea-label" htmlFor={name}>
        {name}
      </label>
    </div>
  );
};

export default React.memo(TextArea);
