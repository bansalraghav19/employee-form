import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "./redux/store/store";
import { getFormData } from "./redux/action";
import { formFields } from "./utilities/formBuilderData";
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import { useEffect } from "react";
import FormBuilder from "./components/screens/formBuilder";
import Final from "./components/screens/final";

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
    enter: 3000,
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
              {formFields.map((field: any, index: number) => (
                <Route
                  path={`/${index}`}
                  key={field.heading}
                  exact
                  render={(props) => (
                    <FormBuilder
                      {...props}
                      {...field}
                      nextRoute={index + 1}
                      lastRoute={index + 1 === formFields.length}
                    />
                  )}
                />
              ))}
              <Route path={`/${formFields.length}`} exact component={Final} />
              <Route path="*">
                <Redirect to="/0" />
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
