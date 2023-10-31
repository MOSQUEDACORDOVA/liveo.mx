import { selectIsLogged } from "@/features/LoginRegisterUser";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const useNavBar = () => {
  const isLogged = useSelector(selectIsLogged);
  const [activeLink, setactiveLink] = useState<number | null>(null);
  const path = useLocation().pathname;

  const handleActiveLink = (index: number) => {
    if (activeLink !== index) {
      setactiveLink(null);
    }
    setactiveLink(index);
  };

  return { path, handleActiveLink, isLogged };
};
