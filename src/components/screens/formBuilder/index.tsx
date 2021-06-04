import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./style.css";
import { validator } from "../../../utilities/validators";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/store/store";
import { getFormData } from "../../../redux/action";
import DynammicField from "./DynammicField";

interface PropsI {
  heading: string;
  fields: any;
  stateDetails: {
    name: string;
    type: string;
    isChecked?: string;
    parent?: string;
    inputType?: string;
    hideFromStorage: boolean;
  }[];
  nextRoute: number | string;
  lastRoute: boolean;
}

const FormBuilder: React.FC<PropsI> = ({
  heading,
  stateDetails,
  fields,
  nextRoute,
  lastRoute,
}) => {
  const selector = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<any>(stateDetails);
  const history = useHistory();
  const eRef = useRef<any>({});

  useEffect(() => {
    const formState = stateDetails?.reduce(
      (acc: object, { name, type, hideFromStorage }: any) => {
        eRef?.current?.[name]?.focus();
        if (type === "BUTTON") {
          return acc;
        } else {
          return {
            ...acc,
            [name]: {
              value: "",
              hasError: false,
              errorMessage: "",
              onChange,
              hideFromStorage,
            },
          };
        }
      },
      {}
    );
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

  const onChange = useCallback(
    async (fieldName: string, value: string, fieldType: string) => {
      const validatorData = await validator(value, fieldName, fieldType);
      setFormValues((prevState: any) => {
        const values = prevState[fieldName];
        return {
          ...prevState,
          [fieldName]: { ...values, value, ...validatorData },
        };
      });
    },
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormData = { ...formValues };
    let hasError = false;
    await Promise.all(
      stateDetails?.map(async (field: any) => {
        if (
          !field?.parent ||
          formValues?.[field?.parent]?.value === field?.ifChecked
        ) {
          const validateData = await validator(
            formValues?.[field?.name]?.value || "",
            field.name,
            field?.inputType || field?.type
          );
          hasError = hasError || validateData.hasError;
          if (validateData.hasError) {
            eRef?.current[field.name]?.focus();
          }
          newFormData[field.name] = {
            ...newFormData[field.name],
            ...validateData,
          };
        }
      })
    );
    if (hasError) {
      setFormValues(newFormData);
    } else {
      const localStorageValues: any = {};
      Object?.keys(formValues || {})?.forEach((key) => {
        const { value, hideFromStorage } = formValues[key];
        if (!hideFromStorage) localStorageValues[key] = value;
      });
      if (!lastRoute)
        dispatch(getFormData({ ...selector, ...localStorageValues }));
      else
        dispatch(
          getFormData({ ...selector, ...localStorageValues, formFilled: true })
        );
      history.push(`/${nextRoute}`, { redirect: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="page form-container" noValidate>
      <h2 className="form-heading">{heading}</h2>
      <DynammicField fields={fields} eRef={eRef} formValues={formValues} />
    </form>
  );
};

export default FormBuilder;
