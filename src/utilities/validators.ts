const validateText = (value: string, fieldName: string) => {
  if (!value?.trim?.()?.length) {
    throw Object.assign({
      error: `Please enter the ${fieldName}`,
    });
  }
  if (value?.length !== value?.trim?.()?.length) {
    throw Object.assign({
      error: `Please remove whitespaces from ${fieldName}`,
    });
  }
};

const validateRadio = (value: string, fieldName: string) => {
  if (!value.trim().length) {
    throw Object.assign({
      error: `Please select the ${fieldName}`,
    });
  }
};

const validateOtp = (value: string, fieldName: string) => {
  if (value.trim().length !== 6) {
    throw Object.assign({
      error: `Please Enter the Valid ${fieldName}`,
    });
  }
};

const validateEmail = (value: string, fieldName: string) => {
  if (!value?.trim?.()?.length) {
    throw Object.assign({
      error: `Please enter the ${fieldName}`,
    });
  }
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!value?.match(regex)) {
    throw Object.assign({
      error: `Please enter a valid email address`,
    });
  }
};

export const validator = (
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
      case "text":
        validateText(value, fieldName);
        break;
      case "RADIO_GROUP":
        validateRadio(value, fieldName);
        break;
      case "CHECKBOX":
        validateRadio(value, fieldName);
        break;
      case "OTP":
        validateOtp(value, fieldName);
        break;
      case "email":
        validateEmail(value, fieldName);
        break;
      case "password":
        validateText(value, fieldName);
        break;
      default:
        break;
    }
  } catch (error) {
    dataPayload = {
      hasError: true,
      errorMessage: error.error,
    };
  }
  return dataPayload;
};
