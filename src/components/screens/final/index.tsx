import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getFormData } from "../../../redux/action";
import { StoreInterface } from "../../../redux/store/store";
import Button from "../../custom/Button";

const Final = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const handleClick = () => {
    dispatch(getFormData({}));
    history.push("*");
  };
  return (
    <div className="page">
      <h2
        style={{ position: "relative", fontSize: "1rem" }}
      >{`Thank you for taking the time to fill the form, ${formData?.firstName} ${formData?.lastName}.
  `}</h2>
      <Button onClick={handleClick} className="mt-30">
        Reset Form
      </Button>
    </div>
  );
};

export default Final;
