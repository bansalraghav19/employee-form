import * as actionTypes from "./actionType";
import { Dispatch } from "react";

export const getFormData =
  (data: any) => async (dispatch: Dispatch<actionTypes.getFormDataI>) => {
    dispatch({
      type: actionTypes.GET_FORM_DATA,
      payload: {
        data,
      },
    });
  };
