import { LoginData as loginData } from "@/features/LoginRegisterUser";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData } from "./login.services.types";
import { PathNames } from "@/config";

export const useLoginData = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  return useMutation(
    async (data: LoginData) => {
      const response = await dispatch(loginData(data));
      return response.payload;
    },
    {
      onSuccess: (response) => {
        if (!response?.user) return;
        const { roles } = response.user;
        let isCompany = false;
        roles.forEach((rol: any) => {
          if (rol.name === "Empresa") {
            navigate(PathNames.companyProfile);
            isCompany = true;
            return;
          }
        });
        if (isCompany) return;
        navigate(PathNames.private.profile);
      },
    }
  );
};
