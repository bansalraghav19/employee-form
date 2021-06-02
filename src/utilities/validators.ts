export const emptyCheck = async (
  value: string,
  fieldName: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (value.trim().length) {
      resolve("OK");
    } else {
      reject(`Please enter the ${fieldName}`);
    }
  });
};

export const whiteSpaces = async (
  value: string,
  fieldName: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (value.trim().length === value.length) {
      resolve("OK");
    } else {
      reject(`Please remove whitespaces from ${fieldName}`);
    }
  });
};

export const validateRadio = async (
  value: string,
  fieldName: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (value.trim().length) {
      resolve("OK");
    } else {
      reject(`Please select the ${fieldName}`);
    }
  });
};

export const validateOtp = async (
  value: string,
  fieldName: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (value.trim().length === 6) {
      resolve("OK");
    } else {
      reject(`Please Enter the Valid ${fieldName}`);
    }
  });
};

export const validator = async (
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
      case "INPUT":
        await emptyCheck(value, fieldName);
        await whiteSpaces(value, fieldName);
        break;
      case "RADIO_GROUP":
        await validateRadio(value, fieldName);
        break;
      case "CHECKBOX":
        await validateRadio(value, fieldName);
        break;
      case "OTP":
        await validateOtp(value, fieldName);
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
