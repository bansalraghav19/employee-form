const validateText = async (
  value: string,
  fieldName: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (!value?.trim?.()?.length) {
      reject(`Please enter the ${fieldName}`);
    }
    if (value?.length !== value?.trim?.()?.length) {
      reject(`Please remove whitespaces from ${fieldName}`);
    }
    resolve("OK");
  });
};

const validateRadio = async (
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

const validateOtp = async (
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

const validateEmail = async (
  value: string,
  fieldName: string
): Promise<string> => {
  console.log(value);
  return new Promise<string>((resolve, reject) => {
    if (!value?.trim?.()?.length) {
      reject(`Please enter the ${fieldName}`);
    }
    const regex = /^\w+([\.-]?\w+)*@groww\.in$/;
    if (!value?.match(regex)) {
      reject(`Please enter a valid @groww.in email address`);
    }
    resolve("OK");
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
      case "text":
        await validateText(value, fieldName);
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
      case "email":
        await validateEmail(value, fieldName);
        break;
      case "password":
        await validateText(value, fieldName);
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
