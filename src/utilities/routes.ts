import React from "react";
import Final from "../components/screens/final";

interface RoutesI {
  path: string;
  component: React.FC;
  exact?: boolean;
  state?: {
    color?: string;
  };
  isFinal?: boolean;
}

const Routes: RoutesI[] = [
  // { path: "/start", component: Start, exact: true },
  // {
  //   path: "/firstname",
  //   component: FirstName,
  //   exact: true,
  // },
  // { path: "/lastname", component: LastName, exact: true },
  // { path: "/gender", component: Gender, exact: true },
  // { path: "/marriage", component: Marraige, exact: true },
  // { path: "/other", component: Hobbies, exact: true },
  // { path: "/t&c", component: Terms, exact: true },
  // { path: "/final", component: Final, exact: true, isFinal: true },
];

export default Routes;
