import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoute {
  isAuthenticated: boolean;
}

const PrivateRoute = ({ isAuthenticated }: PrivateRoute) => {
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
