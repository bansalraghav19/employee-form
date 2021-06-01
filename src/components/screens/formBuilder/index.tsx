import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import Button from "../../custom/Button";
import CheckBox from "../../custom/CheckBox";
import Input from "../../custom/Input";
import TextArea from "../../custom/TextArea";
import RadioGroup from "../../custom/Radio/RadioGroup";
import {
  emptyCheck,
  whiteSpaces,
  validateRadio,
} from "../../../utilities/validators";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";

interface PropsI {
  heading: string;
  fields: any;
  nextRoute: number | string;
  lastRoute: boolean;
}

const FormBuilder: React.FC<PropsI> = ({ heading, fields, nextRoute }) => {
  const selector = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<any>({});
  const history = useHistory();
  const eRef = useRef<any>({});

  useEffect(() => {
    const formState = fields?.reduce((acc: object, field: any) => {
      if (field.type !== "button") {
        eRef?.current?.[field.name]?.focus();
        return {
          ...acc,
          [field.name]: {
            value: "",
            hasError: false,
            errorMessage: "",
            onChange,
          },
        };
      } else return acc;
    }, {});
    console.log(formState);
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

  const validator = async (
    value: string,
    fieldName: string,
    fieldType: string
  ) => {
    let dataPayload = {
      hasError: false,
      errorMessage: "",
    };
    try {
      switch (fieldType) {
        case "input":
          await emptyCheck(value, fieldName);
          await whiteSpaces(value, fieldName);
          break;
        case "radio_group":
          await validateRadio(value, fieldName);
          break;
        case "checkbox":
          await validateRadio(value, fieldName);
          break;
        default:
          break;
      }
    } catch (error) {
      dataPayload = {
        hasError: true,
        errorMessage: error,
      };
    }
    return dataPayload;
  };

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
          case "text_area":
            return (
              <TextArea
                className="mb-20"
                eRef={eRef}
                {...field}
                {...(formValues?.[field.name] || {})}
              />
            );
          case "input":
            return (
              <Input
                eRef={eRef}
                {...field}
                {...(formValues?.[field.name] || {})}
              />
            );
          case "button":
            return (
              <Button {...field} {...(formValues?.[field.name] || {})}>
                {field.name}
              </Button>
            );
          case "radio_group":
            return (
              <RadioGroup {...field} {...(formValues?.[field.name] || {})} />
            );
          case "checkbox":
            return (
              <CheckBox {...(formValues?.[field.name] || {})} {...field} />
            );
          default:
            return null;
        }
      })}
    </form>
  );
};

export default FormBuilder;
