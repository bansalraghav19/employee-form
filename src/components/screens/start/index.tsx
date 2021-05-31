import React, { CSSProperties, FormEvent } from "react";
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push("firstname");
  };
  return (
    <form onSubmit={handleSubmit} className="page">
      <h2 style={headerStyle}>Looking for Connecting with us?</h2>
      <Button style={buttonStyle}>Sign Up</Button>
    </form>
  );
};

export default Start;
