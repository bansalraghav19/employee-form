import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { formFields } from "../../../utilities/formBuilderData";
import FormBuilder from "../formBuilder";
import Final from "../final";
import usePrevious from "../../../hooks/usePrevious";
import { useMemo } from "react";
import PrivateRoute from "../../pricateRoute";

interface Props {
  localStorageData: any;
}

const Routes: React.FC<Props> = ({ localStorageData }) => {
  const location = useLocation();
  const previousLocation = usePrevious(location.pathname);

  const timeout = {
    enter: 600,
    exit: 0,
  };

  const getAnimationType = useMemo(() => {
    const curStepNumber: number =
      parseInt(location.pathname.split("/")[1]) || -2;
    let previousStepNumber: number = -1;
    if (previousLocation) {
      previousStepNumber = parseInt(previousLocation?.split?.("/")[1]);
    }
    return curStepNumber - previousStepNumber >= 0;
  }, [location?.pathname, previousLocation]);

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
          <div
            className={`page-box down ${getAnimationType ? "right" : "left"}`}
          >
            <Switch location={location}>
              {formFields.map((field: any, index: number) => (
                <PrivateRoute
                  path={`/${index}`}
                  key={field.heading}
                  exact
                  component={FormBuilder}
                  routesCount={formFields.length}
                  nextRoute={index + 1}
                  localStorageData={localStorageData}
                  lastRoute={index + 1 === formFields.length}
                  {...field}
                />
              ))}
              <PrivateRoute
                path={`/${formFields.length}`}
                exact
                component={Final}
                localStorageData={localStorageData}
                isFinal={true}
              />
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

export default React.memo(Routes);
