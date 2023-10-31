import { selectShowNavMobile, showNavMobile } from "@/features/NavBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Links, LinksSideBar } from ".";
import { useLocation } from "react-router-dom";
import { PathNames, removeUserLocalStorage } from "@/config";
import { useEffect, useState } from "react";
import { selectIsLogged, setLogged } from "@/features/LoginRegisterUser";
import { Divider } from "@mui/material";

export const NavBarMobile = () => {
  const path = useLocation().pathname;
  const show = useSelector(selectShowNavMobile);
  const isLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch();
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
  }, [isLogged]);

  const handleShowOffNavMobile = () => {
    dispatch(showNavMobile(false));
  };

  const handleLoggin = () => {
    handleShowOffNavMobile();
    if (closedSession === btnName) {
      removeUserLocalStorage();
      dispatch(setLogged(false));
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute lg:hidden w-72 h-[calc(100dvh-120px)] py-4 right-0 z-50 ${
        show ? "translate-x-0" : "translate-x-full"
      } duration-200`}
    >
      <span
        className={`absolute inset-0 ${
          path === "/" ? "bg-white" : "bg-gradientNavBarMobile"
        }`}
      ></span>
      <div className="flex relative flex-col items-center justify-between h-full">
        <Links onClick={() => handleShowOffNavMobile()} row />
        {isLogged && (
          <>
            <Divider className="w-full mt-4" />
            <div className="overflow-y-auto w-full px-2">
              <LinksSideBar onClick={() => handleShowOffNavMobile()} />
            </div>
            <Divider className="w-full mb-4" />
          </>
        )}

        <Button
          onClick={() => handleLoggin()}
          uppercase
          to={loginSession === btnName ? PathNames.login : ""}
          text={btnName}
          bgColor="light-violet"
        />
      </div>
    </div>
  );
};
