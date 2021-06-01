import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import Button from "../../custom/Button";
import CheckBox from "../../custom/CheckBox";
import Input from "../../custom/Input";
import TextArea from "../../custom/TextArea";
import RadioGroup from "../../custom/Radio/RadioGroup";
import { validator } from "../../../utilities/validators";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";

interface PropsI {
  heading: string;
  fields: any;
  stateDetails?: string[];
  nextRoute: number | string;
  lastRoute: boolean;
}

const FormBuilder: React.FC<PropsI> = ({
  heading,
  stateDetails,
  fields,
  nextRoute,
}) => {
  const selector = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<any>(stateDetails);
  const history = useHistory();
  const eRef = useRef<any>({});

  useEffect(() => {
    const formState = stateDetails?.reduce((acc: object, field: any) => {
      eRef?.current?.[field]?.focus();
      return {
        ...acc,
        [field]: {
          value: "",
          hasError: false,
          errorMessage: "",
          onChange,
        },
      };
    }, {});
    setFormValues(formState);
  }, []);

  useEffect(() => {
    setFormValues((prevState: any) => {
      const newFormValues: any = { ...prevState };
      Object?.keys(selector || {})?.forEach((key) => {
        if (key in newFormValues)
          newFormValues[key].value = selector[key] || "";
      });
      return newFormValues;
    });
  }, [selector]);

  const onChange = async (
    fieldName: string,
    value: string,
    fieldType: string
  ) => {
    const validatorData = await validator(value, fieldName, fieldType);
    setFormValues((prevState: any) => {
      const values = prevState[fieldName];
      return {
        ...prevState,
        [fieldName]: { ...values, value, ...validatorData },
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = { ...formValues };
    let hasError = false;
    await Promise.all(
      fields.map(async (field: any) => {
        const validateData = await validator(
          formValues?.[field?.name]?.value,
          field.name,
          field.type
        );
        hasError = hasError || validateData.hasError;
        if (validateData.hasError) {
          eRef?.current[field.name]?.focus();
        }
        newFormData[field.name] = {
          ...newFormData[field.name],
          ...validateData,
        };
      })
    );
    if (hasError) {
      console.log(hasError);
      setFormValues(newFormData);
    } else {
      const localStorageValues: any = {};
      Object?.keys(formValues || {})?.forEach((key) => {
        const { value } = formValues[key];
        localStorageValues[key] = value;
      });
      console.log(localStorageValues);
      dispatch(getFormData({ ...selector, ...localStorageValues }));
      history.push(`/${nextRoute}`, { redirect: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="page form-container">
      <h2 className="form-heading">{heading}</h2>
      {fields?.map((field: any) => {
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
            return <Button {...field}>{field.name}</Button>;
          case "RADIO_GROUP":
            return (
              <RadioGroup eRef={eRef} {...field} formValues={formValues} />
            );
          case "CHECKBOX":
            return <CheckBox {...field} formValues={formValues} />;
          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormBuilder;