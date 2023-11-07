import {
  EditProfile as editProfile,
  getUserProfile,
  LoginData as loginData,
  selectIsLogged,
} from "@/features/LoginRegisterUser";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData } from "./auth.services.types";
import { PathNames, TOKEN, getToken } from "@/config";
import { IPROFILEDATA } from "@/types";

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

export const useEditProfile = () => {
  const dispatch = useDispatch<any>();

  return useMutation(async (data: IPROFILEDATA) => {
    const response = await dispatch(editProfile(data));
    return response.payload;
  });
};

export const useGetUserProfile = () => {
  const dispatch = useDispatch<any>();
  const isLogged = useSelector(selectIsLogged);

  return useQuery(
    ["user", getToken()],
    async () => {
      const response = await dispatch(getUserProfile(getToken() ?? ""));
      return response.payload;
    },
    {
      enabled: !isLogged,
    }
  );
};
