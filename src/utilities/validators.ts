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
