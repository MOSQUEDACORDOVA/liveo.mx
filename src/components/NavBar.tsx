import logo from "@/assets/navbar/Logo Horizontal.png";
import { Links, Button } from ".";
import { Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { showNavMobile } from "@/features/NavBarSlice";
import {
  PathNames,
  removeTokenLocalStorage,
  removeUserLocalStorage,
} from "@/config";
import { useEffect, useState } from "react";
import { selectIsLogged, setLogged } from "@/features/LoginRegisterUser";

export const NavBar = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const [btnName, setBtnName] = useState<
    typeof closedSession | typeof loginSession
  >("iniciar sesión");
  const closedSession = "cerrar sesión";
  const loginSession = "iniciar sesión";

  useEffect(() => {
    if (isLogged) {
      setBtnName(closedSession);
    } else {
      setBtnName(loginSession);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const handleShowNavMobile = (action?: string | boolean) => {
    dispatch(showNavMobile(action ?? "toggle"));
  };

  const handleLoggin = () => {
    if (closedSession === btnName) {
      removeUserLocalStorage();
      removeTokenLocalStorage();
      dispatch(setLogged(false));
    }
  };

  const handlelistenerUserEvents = () => {
    if (isLogged) {
      addEventListener("mousemove", resetTimer, false);
      addEventListener("mousedown", resetTimer, false);
      addEventListener("keypress", resetTimer, false);
      addEventListener("DOMMouseScroll", resetTimer, false);
      addEventListener("mousewheel", resetTimer, false);
      addEventListener("touchmove", resetTimer, false);
      addEventListener("MSPointerMove", resetTimer, false);
      startTimer();
    } else {
      removeEventListener("mousemove", resetTimer, false);
      removeEventListener("mousedown", resetTimer, false);
      removeEventListener("keypress", resetTimer, false);
      removeEventListener("DOMMouseScroll", resetTimer, false);
      removeEventListener("mousewheel", resetTimer, false);
      removeEventListener("touchmove", resetTimer, false);
      removeEventListener("MSPointerMove", resetTimer, false);
    }
  };

  const startTimer = () => window.setTimeout(goInactive, 60000);

  const resetTimer = () => {
    window.clearTimeout(startTimer());
    goActive();
  };
  const goInactive = () => handleLoggin();
  const goActive = () => startTimer();

  useEffect(() => handlelistenerUserEvents(), [isLogged]);

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
          onClick={() => handleLoggin()}
          uppercase
          to={loginSession === btnName ? PathNames.login : ""}
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
