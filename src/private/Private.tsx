import { PathNames } from "@/config";
import { selectIsLogged } from "@/features/LoginRegisterUser";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouteUserDashboard = () => {
  const islogged = useSelector(selectIsLogged);
  console.log({ islogged });
  return islogged ? <Outlet /> : <Navigate to={PathNames.login} />;
};
