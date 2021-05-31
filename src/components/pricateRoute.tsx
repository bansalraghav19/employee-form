import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
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
  ...props
}) => {
  const isDone = useSelector(
    (state: StoreInterface) => state?.formData?.data?.istermsChecked
  );
  return isDone && !isFinal ? (
    <Redirect to="/final" />
  ) : (
    <Route {...props} component={Component} />
  );
};

export default PrivateRoute;
