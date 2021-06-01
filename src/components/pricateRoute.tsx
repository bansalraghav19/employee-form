import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useRouteMatch, useLocation } from "react-router";
import { StoreInterface } from "../redux/store/store";

interface RoutesI {
  path: string;
  component: React.FC;
  exact?: boolean;
  state?: {
    color?: string;
  };
  isFinal?: boolean;
}

const PrivateRoute: React.FC<RoutesI> = ({
  component: Component,
  isFinal,
  ...rest
}) => {
  const isMatch = useRouteMatch("/start");
  const location = useLocation<Location>();
  const isDone = useSelector(
    (state: StoreInterface) => state?.formData?.data?.istermsChecked
  );

  const getRoute = <T extends {}>(props: T) => {
    // if form filled and not on final page
    if (isDone && !isFinal) return <Redirect to="/final" />;

    // if on final page or on start page
    if (isDone || isMatch) return <Component {...props} />;

    // if on any component page and came from valid path
    if ("redirect" in (location?.state || {})) return <Component {...props} />;

    // invalid path redirect to home-start-page
    return <Redirect to="/start" />;
  };

  return <Route {...rest} render={(props) => getRoute(props)} />;
};

export default PrivateRoute;
