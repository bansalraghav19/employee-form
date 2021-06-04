import React from "react";
import { Redirect, Route, useRouteMatch, useLocation } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

interface RoutesI {
  path: string;
  component: React.FC;
  exact?: boolean;
  isFinal?: boolean;
  routesCount?: number;
  localStorageData: any;
}

const PrivateRoute: React.FC<RoutesI> = ({
  component: Component,
  routesCount,
  isFinal,
  localStorageData,
  ...rest
}) => {
  const isMatch = useRouteMatch("/0");
  const location = useLocation<Location>();

  const getRoute = <T extends {}>(props: T) => {
    // homepage
    if (isMatch?.isExact) return <Component {...props} {...rest} />;

    if (localStorageData?.formFilled) {
      // if form filled and on final page
      if (isFinal) return <Component {...props} />;

      // if form filled and not final page
      return <Redirect to={`/${routesCount}`} />;
    }

    // if on any component page and came from valid path
    if ("redirect" in (location?.state || {}))
      return <Component {...props} {...rest} />;

    // invalid path redirect to home-start-page
    return <Redirect to="/" />;
  };

  return <Route render={(props) => getRoute(props)} />;
};

export default React.memo(PrivateRoute);
