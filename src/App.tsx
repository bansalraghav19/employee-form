import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "./redux/store/store";
import { getFormData } from "./redux/action";
import Routes from "./utilities/routes";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import PrivateRoute from "./components/pricateRoute";

const App = () => {
  const location = useLocation();
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

  const timeout = {
    enter: 600,
    exit: 0,
  };
  return (
    <div className="App">
      <TransitionGroup component="div" className="transition-box">
        <CSSTransition
          key={location.pathname}
          classNames="pageSlider"
          timeout={timeout}
          unmountOnExit={true}
          mountOnEnter={false}
        >
          <div className="page-box">
            <Switch location={location}>
              {Routes.map((props) => (
                <PrivateRoute key={props.path} {...props} />
              ))}
              <Route path="*">
                <Redirect to="/start" />
              </Route>
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className="glass" id="particles-js"></div>
    </div>
  );
};

export default App;
