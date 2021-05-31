/*  eslint-disable jsx-a11y/anchor-is-valid */

import React, { CSSProperties, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
import { getFormData } from "../../../redux/action";
import { StoreInterface } from "../../../redux/store/store";
import Button from "../../custom/Button";
import CheckBox from "../../custom/CheckBox";

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const containerStyles: CSSProperties = {
  display: "flex",
};

const buttonStyles: CSSProperties = {
  alignSelf: "flex-start",
};

const Terms = () => {
  const history = useHistory();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setIsChecked(formData?.istermsChecked || false);
  }, [formData?.istermsChecked]);

  const handleClick = () => {
    if (isChecked) {
      dispatch(getFormData({ ...formData, istermsChecked: true }));
      history.push("/final");
    } else {
      setHasError(true);
    }
  };

  const handleChange = (id: string) => {
    if (!isChecked && hasError) {
      setHasError(false);
    }
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div style={styles} className="page">
      <div style={containerStyles} className="mb-10">
        <CheckBox onChange={handleChange} name="terms" checked={isChecked} />
        <span>
          I accept <a>terms and conditions</a>
        </span>
      </div>
      <div className="error-box">
        <CSSTransition
          in={hasError}
          timeout={300}
          classNames="fade-in"
          unmountOnExit
        >
          <div className="error">Please select the terms & conditions</div>
        </CSSTransition>
      </div>
      <Button className="mt-20" onClick={handleClick} style={buttonStyles}>
        Submit
      </Button>
    </div>
  );
};

export default Terms;
