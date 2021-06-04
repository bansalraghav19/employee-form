import React, { ChangeEvent, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Input from "../Input";
import "./index";
import Radio from "./index";

const RadioGroup: React.FC<any> = (props) => {
  const { value, hasError, errorMessage, onChange } =
    props.formValues[props.name] || {};
  const [curRadioId, setCurRadioId] = useState<number>(-1);
  const [showChildNode, setShowChildNode] = useState<boolean>(false);

  useEffect(() => {
    const activeRadioIndex = (props?.values as string[]).indexOf(value);
    setCurRadioId(activeRadioIndex);
    setShowChildNode(
      activeRadioIndex !== -1 && props?.childNodes?.[activeRadioIndex]
    );
  }, [value]);

  const handleChange = (id: string, index: number) => {
    if (onChange instanceof Function) {
      onChange(props.name, id, "RADIO_GROUP");
      setCurRadioId(index);
    }
  };
  return (
    <>
      <div className="radio-group-container">
        {props.values?.map((cur: string, idx: number) => (
          <Radio
            checked={cur === value}
            onChange={(id: string) => handleChange(id, idx)}
            name={props.name}
            value={cur}
          />
        ))}
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
      <CSSTransition
        in={showChildNode}
        timeout={600}
        classNames="alert"
        unmountOnExit
      >
        <Input
          eRef={props.eRef}
          {...(props?.childNodes?.[curRadioId] || {})}
          formValues={props.formValues}
        />
      </CSSTransition>
    </>
  );
};

export default RadioGroup;
