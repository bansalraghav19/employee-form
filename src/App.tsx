import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "./redux/store/store";
import { getFormData } from "./redux/action";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import RoutesComponent from "./components/screens/Routes";

const App = () => {
  const formData = useSelector((state: StoreInterface) => state.formData.data);
  const dispatch = useDispatch();
  const [storageValue, setStorageValue] = useLocalStorage("formData", formData);

  useEffect(() => {
    dispatch(getFormData(storageValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStorageValue(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  return <RoutesComponent localStorageData={storageValue} />;
};

export default App;
