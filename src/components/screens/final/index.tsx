import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getFormData } from "../../../redux/action";
import { StoreInterface } from "../../../redux/store/store";
import Button from "../../custom/Button";

const Final = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getFormData({}));
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit} className="page">
      <h2
        style={{ position: "relative", fontSize: "1rem" }}
      >{`Thank you for taking the time to fill the form, ${formData?.["First Name"]} ${formData?.["Last Name"]}.
  `}</h2>
      <Button name="final" className="mt-30">
        Reset Form
      </Button>
    </form>
  );
};

export default Final;
