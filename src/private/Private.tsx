import { PathNames } from "@/config";
import { selectIsLogged } from "@/features/LoginRegisterUser";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouteUserDashboard = () => {
  const islogged = useSelector(selectIsLogged);
  return islogged ? <Outlet /> : <Navigate to={PathNames.login} />;
};
