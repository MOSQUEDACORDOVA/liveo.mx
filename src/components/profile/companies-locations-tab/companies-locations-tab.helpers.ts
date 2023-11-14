import { IUser } from "@/features/LoginRegisterUser";
import * as yup from "yup";

export const getCompaniesLocationsDefaultValues = (user: IUser | null) => ({
  iframeGoogle: user?.iframe_google || "",
});

export const getCompaniesLocationsResolver = () =>
  yup.object().shape({
    iframeGoogle: yup
      .string()
      .matches(
        /<iframe[^>]*>[\s\S]*<\/iframe>/i,
        "Ingrese un iframe de google maps"
      ),
  });
