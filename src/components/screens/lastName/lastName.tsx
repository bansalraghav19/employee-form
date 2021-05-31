import React, {
  useState,
  ChangeEvent,
  useLayoutEffect,
  useRef,
  FormEvent,
} from "react";
import "./style.css";
import Button from "../../custom/Button";
import Input from "../../custom/Input";
import { useHistory } from "react-router-dom";
import { whiteSpaces, emptyCheck } from "../../../utilities/validators";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";

const FirstName = () => {
  const history = useHistory();
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [lastName, setLastName] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  useLayoutEffect(() => {
    setLastName(formData?.lastName || "");
  }, [formData?.lastName]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    try {
      await emptyCheck(lastName, "Last Name");
      await whiteSpaces(lastName, "Last Name");
      dispatch(getFormData({ ...formData, lastName }));
      history.push("/gender");
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
      inputRef?.current?.focus();
    }
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
    try {
      await emptyCheck(event.target.value, "Last Name");
      await whiteSpaces(event.target.value, "Last Name");
      if (hasError) {
        setHasError(false);
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(error);
      inputRef?.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="page lastname">
      <h2>And your last name?</h2>
      <Input
        value={lastName}
        hasError={hasError}
        errorMessage={errorMessage}
        name="Last Name"
        onChange={handleChange}
        inputRef={inputRef}
      />
      <Button className="btn mt-30">Next</Button>
    </form>
  );
};

export default FirstName;
