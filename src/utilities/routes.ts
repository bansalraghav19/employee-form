import React from "react";
import Final from "../components/screens/final";
import FirstName from "../components/screens/firstName";
import Gender from "../components/screens/gender";
import Hobbies from "../components/screens/otherDetails";
import LastName from "../components/screens/lastName/lastName";
import Marraige from "../components/screens/martialStatus";
import Start from "../components/screens/start";
import Terms from "../components/screens/t&c";

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
  { path: "/start", component: Start, exact: true },
  {
    path: "/firstname",
    component: FirstName,
    exact: true,
  },
  { path: "/lastname", component: LastName, exact: true },
  { path: "/gender", component: Gender, exact: true },
  { path: "/marriage", component: Marraige, exact: true },
  { path: "/other", component: Hobbies, exact: true },
  { path: "/t&c", component: Terms, exact: true },
  { path: "/final", component: Final, exact: true, isFinal: true },
];

export default Routes;
