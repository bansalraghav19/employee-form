import React, { ChangeEvent, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";
import "./style.css";
import Button from "../../custom/Button";
import Input from "../../custom/Input";
import { useHistory } from "react-router-dom";
import { whiteSpaces, emptyCheck } from "../../../utilities/validators";

const FirstName = () => {
  const history = useHistory();
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useLayoutEffect(() => {
    setFirstName(formData?.firstName || "");
  }, [formData?.firstName]);

  const handleSubmit = async () => {
    try {
      await emptyCheck(firstName, "First Name");
      await whiteSpaces(firstName, "First Name");
      dispatch(getFormData({ ...formData, firstName }));
      history.push("/lastname");
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
    try {
      await emptyCheck(event.target.value, "First Name");
      await whiteSpaces(event.target.value, "First Name");
      if (hasError) {
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
    }
  };

  return (
    <div className="page firstname-container">
      <h2>Hi there, what's your first name?</h2>
      <Input
        hasError={hasError}
        errorMessage={errorMessage}
        onChange={handleChange}
        value={firstName}
        name="First Name"
      />
      <Button className="btn mt-30" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
};

export default FirstName;
