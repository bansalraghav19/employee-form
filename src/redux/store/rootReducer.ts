import { combineReducers } from "redux";
import getFormData from "../reducer";

const rootReducer = combineReducers({
  formData: getFormData,
});

export default rootReducer;
