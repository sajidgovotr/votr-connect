import { RootState } from "@/store";
import { ElementType } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

interface IPublicRoute {
    component: ElementType;
}

const PublicRoute = ({ component: Component, ...rest }: IPublicRoute) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (token) {
        return <Navigate to={`/`} replace />;
    }

    return <Component {...rest} />;
};

export default PublicRoute;
