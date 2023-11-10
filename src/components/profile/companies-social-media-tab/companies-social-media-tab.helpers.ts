import { IUser } from "@/features/LoginRegisterUser";
import * as yup from "yup";

export const getCompaniesSocialMediaDefaultValues = (user: IUser | null) => ({
  url_facebook: user?.url_facebook || "",
  url_instagram: user?.url_instagram || "",
  url_tikTok: user?.url_tikTok || "",
});

export const getCompaniesSocialMediaResolvers = () =>
  yup.object().shape({
    url_facebook: yup.string().url("El formato de la url no es correcto"),
    url_instagram: yup.string().url("El formato de la url no es correcto"),
    url_tikTok: yup.string().url("El formato de la url no es correcto"),
  });
