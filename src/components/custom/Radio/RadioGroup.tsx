import React from "react";
import { CSSTransition } from "react-transition-group";
import "./index";
import Radio from "./index";

const RadioGroup: React.FC<any> = (props) => {
  const handleChange = (id: string) => {
    if (props.onChange instanceof Function) {
      props.onChange(props.name, id, "radio_group");
    }
  };
  return (
    <>
      <div className="radio-group-container">
        {props.values?.map((value: string) => (
          <Radio
            checked={value === props.value}
            onChange={handleChange}
            name={props.name}
            value={value}
          />
        ))}
      </div>
      <div className="error-box mb-30">
        <CSSTransition
          in={props.hasError || false}
          timeout={300}
          classNames="fade-in"
          unmountOnExit
        >
          <div className="error">{props.errorMessage}</div>
        </CSSTransition>
      </div>
    </>
  );
};

export default RadioGroup;
