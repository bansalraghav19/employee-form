import React, { CSSProperties } from "react";
import { useHistory } from "react-router";
import Button from "../../custom/Button";

const headerStyle: CSSProperties = {
  position: "relative",
  fontSize: "1.3rem",
};

const buttonStyle: CSSProperties = {
  fontSize: "1rem",
};

const Start = () => {
  const history = useHistory();
  const handleClick = () => history.push("firstname");
  return (
    <div className="page">
      <h2 style={headerStyle}>Looking for Connecting with us?</h2>
      <Button style={buttonStyle} onClick={handleClick}>
        Sign Up
      </Button>
    </div>
  );
};

export default Start;
