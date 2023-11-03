import { useMutation } from "react-query";
import { registerCompany } from "./company.services";

export const useRegisterCompany = () => {
  return useMutation(registerCompany);
};
