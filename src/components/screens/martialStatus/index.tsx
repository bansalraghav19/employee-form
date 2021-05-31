import React, { useState, ChangeEvent, useLayoutEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import "./style.css";
import Button from "../../custom/Button";
import Input from "../../custom/Input";
import Radio from "../../custom/Radio";
import { emptyCheck, whiteSpaces } from "../../../utilities/validators";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";

const Marraige = () => {
  const [martialStatus, setMartialStatus] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [spouseName, setSpouseName] = useState<string>("");
  const history = useHistory();
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setMartialStatus(formData?.martialStatus || "");
    setSpouseName(formData?.spouseName || "");
  }, [formData?.martialStatus, formData?.spouseName]);

  const handleRadio = (id: string) => {
    setMartialStatus(id);
    if (hasError) {
      setHasError(false);
    }
  };

  const handleClick = async () => {
    try {
      if (!martialStatus) {
        if (!hasError) setHasError(true);
      } else {
        if (martialStatus === "Married") {
          await emptyCheck(spouseName, "Spouse Name");
          await whiteSpaces(spouseName, "Spouse Name");
        }
        dispatch(getFormData({ ...formData, martialStatus, spouseName }));
        history.push("/other");
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSpouseName(event.target.value);
    try {
      await emptyCheck(event.target.value, "Spouse Name");
      await whiteSpaces(event.target.value, "Spouse Name");
      if (hasError) {
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className="page status-container">
      <h2 className="header mb-20">What's your Martial status?</h2>
      <div className="radio-btns mb-10">
        {["Married", "Unmarried"].map((item) => (
          <Radio
            className="btn"
            onChange={handleRadio}
            name="status"
            value={item}
            checked={martialStatus === item}
          />
        ))}
      </div>
      <div className="error-box mb-10">
        <CSSTransition
          in={hasError && martialStatus === ""}
          timeout={300}
          classNames="fade-in"
          unmountOnExit
        >
          <div className="error">Please select the Martial Status</div>
        </CSSTransition>
      </div>
      <CSSTransition
        in={martialStatus === "Married"}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <Input
          onChange={handleChange}
          value={spouseName}
          className="animate"
          hasError={hasError && martialStatus !== ""}
          errorMessage={errorMessage}
          name="Spouse Name"
        />
      </CSSTransition>
      <Button className="button mt-10" onClick={handleClick}>
        Next
      </Button>
    </div>
  );
};
export default Marraige;
