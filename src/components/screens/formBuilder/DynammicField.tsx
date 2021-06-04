import React from "react";
import Button from "../../custom/Button";
import CheckBox from "../../custom/CheckBox";
import Input from "../../custom/Input";
import TextArea from "../../custom/TextArea";
import RadioGroup from "../../custom/Radio/RadioGroup";
import OtpComponent from "../../custom/otpComponent";

interface PropsI {
  fields: any;
  formValues: any;
  eRef: any;
}

const DynammicField: React.FC<PropsI> = ({ fields, formValues, eRef }) => {
  return fields?.map((field: any) => {
    switch (field.type) {
      case "TEXTAREA":
        return (
          <TextArea
            className="mb-20"
            eRef={eRef}
            {...field}
            formValues={formValues}
          />
        );
      case "INPUT":
        return <Input eRef={eRef} {...field} formValues={formValues} />;
      case "BUTTON":
        return (
          <Button className="mt-20" eRef={eRef} {...field}>
            {field.name}
          </Button>
        );
      case "RADIO_GROUP":
        return <RadioGroup eRef={eRef} {...field} formValues={formValues} />;
      case "CHECKBOX":
        return <CheckBox {...field} formValues={formValues} />;
      case "OTP":
        return <OtpComponent {...field} formValues={formValues} />;
      default:
        return null;
    }
  });
};

export default DynammicField;
