export const GET_FORM_DATA = "GET_FORM_DATA";

export interface dataInterface {
  firstName?: string;
  lastName?: string;
  gender?: string;
  martialStatus?: string;
  spouseName?: string;
  otherDetails?: string;
  istermsChecked?: boolean;
}

export interface getFormDataI {
  type: typeof GET_FORM_DATA;
  payload: {
    data: dataInterface;
  };
}
