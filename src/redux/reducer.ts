import * as Types from "./actionType";

interface State {
  data: Types.dataInterface;
  error: boolean;
  isLoading: boolean;
}

const initialState: State = {
  data: {},
  error: false,
  isLoading: false,
};

const getFormData = (
  state: State = initialState,
  action: Types.getFormDataI
): State => {
  switch (action.type) {
    case Types.GET_FORM_DATA:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default getFormData;
