import React, { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Radio from "../../custom/Radio";
import Button from "../../custom/Button";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";

const Gender = () => {
  const history = useHistory();
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [gender, setGender] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  useLayoutEffect(() => {
    setGender(formData?.gender || "");
    console.log(formData?.gender);
  }, [formData?.gender]);

  const handleChange = (id: string) => {
    setGender(id);
    if (hasError) {
      setHasError(false);
    }
  };

  const handleClick = () => {
    if (!gender) {
      setHasError(true);
    } else {
      dispatch(getFormData({ ...formData, gender }));
      history.push("/marriage");
    }
  };
  return (
    <div className="page gender">
      <h2 className="header mb-30">What is your Gender?</h2>
      <div className="radio-btns mb-10">
        {["Male", "Female"].map((item) => (
          <Radio
            key={item}
            onChange={handleChange}
            className="btn"
            name="gender"
            value={item}
            checked={item === gender}
          />
        ))}
      </div>
      <div className="error-box">
        <CSSTransition
          in={hasError}
          timeout={300}
          classNames="fade-in"
          unmountOnExit
        >
          <div className="error">Please select the gender</div>
        </CSSTransition>
      </div>
      <Button onClick={handleClick} className="button mt-30">
        Next
      </Button>
    </div>
  );
};

export default React.memo(Gender);
