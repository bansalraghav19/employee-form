import React, { ChangeEvent, useLayoutEffect, useState } from "react";
import "./style.css";
import { useHistory } from "react-router";
import Button from "../../custom/Button";
import TextArea from "../../custom/TextArea/index";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";

const Hobbies = () => {
  const history = useHistory();
  const [otherDetails, setOtherDetails] = useState<string>("");
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setOtherDetails(formData?.otherDetails || "");
  }, [formData?.otherDetails]);

  const handleClick = () => {
    dispatch(getFormData({ ...formData, otherDetails }));
    history.push("/t&c");
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setOtherDetails(event.target.value);

  return (
    <div className="page otherDetails">
      <h2 className="mb-20">Tell us a bit about yourself.</h2>
      <TextArea
        value={otherDetails}
        onChange={handleChange}
        className="mb-20"
        name="Other Details"
      />
      <Button onClick={handleClick}>Next</Button>
    </div>
  );
};

export default Hobbies;
