import { useCallback, useEffect, useRef } from "react";
import { removeTokenLocalStorage, removeUserLocalStorage } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLogged, setLogged } from "@/features/LoginRegisterUser";
import { useQueryClient } from "react-query";

const MAX_INACTIVE_TIME = 60 * 60; // 1 minute
let inactivityTimer: any = null;

export const useValidateInactive = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const queryClient = useQueryClient();

  const inactiveTime = useRef(0);

  const handleInactivity = useCallback(() => {
    if (!isLogged) return;
    removeTokenLocalStorage();
    removeUserLocalStorage();
    dispatch(setLogged(false));
    queryClient.invalidateQueries(["user"]);
  }, [isLogged, queryClient, dispatch]);

  useEffect(() => {
    const resetCounter = () => {
      inactiveTime.current = 0;
    };

    const detectInactivity = () => {
      inactivityTimer = setInterval(() => {
        inactiveTime.current = inactiveTime.current + 1;
        if (inactiveTime.current >= MAX_INACTIVE_TIME) {
          handleInactivity();
          resetCounter();
          clearInterval(inactivityTimer);
        }
      }, 1000);
    };

    addEventListener("mousemove", resetCounter);
    addEventListener("mousedown", resetCounter);
    addEventListener("keydown", resetCounter);
    addEventListener("keypress", resetCounter);
    addEventListener("DOMMouseScroll", resetCounter);
    addEventListener("mousewheel", resetCounter);
    addEventListener("touchmove", resetCounter);
    addEventListener("MSPointerMove", resetCounter);
    detectInactivity();
    return () => {
      window.removeEventListener("mousemove", resetCounter);
      window.removeEventListener("mousedown", resetCounter);
      window.removeEventListener("keydown", resetCounter);
      window.removeEventListener("keypress", resetCounter);
      window.removeEventListener("DOMMouseScroll", resetCounter);
      window.removeEventListener("mousewheel", resetCounter);
      window.removeEventListener("touchmove", resetCounter);
      window.removeEventListener("MSPointerMove", resetCounter);
      clearInterval(inactivityTimer);
    };
  }, [inactiveTime.current, MAX_INACTIVE_TIME, handleInactivity]);
};
