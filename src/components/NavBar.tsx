import logo from "@/assets/navbar/Logo Horizontal.png";
import { Links, Button } from ".";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { showNavMobile } from "@/features/NavBarSlice";
import {
  PathNames,
  removeTokenLocalStorage,
  removeUserLocalStorage,
} from "@/config";
import { selectIsLogged, setLogged } from "@/features/LoginRegisterUser";
import { useQueryClient } from "react-query";

export const NavBar = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const isLogged = useSelector(selectIsLogged);
  const closedSession = "cerrar sesión";
  const loginSession = "iniciar sesión";
  const btnName = isLogged ? closedSession : loginSession;

  const handleShowNavMobile = (action?: string | boolean) => {
    dispatch(showNavMobile(action ?? "toggle"));
  };

  const handleLoggin = () => {
    if (isLogged) {
      removeUserLocalStorage();
      removeTokenLocalStorage();
      dispatch(setLogged(false));
      queryClient.invalidateQueries(["user"]);
      return;
    }

    navigate(PathNames.login);
  };

  return (
    <div
      className={`flex items-center overflow-auto justify-between py-4 px-10 w-full h-20 z-50 ${
        path === "/" ? "bg-white" : "bg-gradientNavBar"
      }`}
    >
      <Link
        onClick={() => handleShowNavMobile(false)}
        className="shrink-0 max-w-[250px]"
        to={PathNames.home}
      >
        <img src={logo} alt="logo" />
      </Link>
      <div className="hidden lg:flex items-center gap-8">
        <Links />
        <Button
          onClick={handleLoggin}
          uppercase
          text={btnName}
          bgColor="light-violet"
        />
      </div>

      <IconButton className="lg:hidden" onClick={() => handleShowNavMobile()}>
        <MenuIcon className="text-violet" />
      </IconButton>
    </div>
  );
};
