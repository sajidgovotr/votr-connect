import { ElementType } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "@/store";

interface IPrivateRoute {
  component: ElementType;
  navLink: string;
}

const PrivateRoute = ({ component: Component, navLink, ...rest }: IPrivateRoute) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Component {...rest} />;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
