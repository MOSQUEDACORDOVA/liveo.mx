import { useMutation, useQuery } from "react-query";
import { getCategoriesServices, registerCompany } from "./company.services";

export const useRegisterCompany = () => {
  return useMutation(registerCompany);
};

export const useGetCategoriesServices = () => {
  return useQuery("categories", getCategoriesServices, {
    retry: 1,
    staleTime: 5 * 1000 * 60,
  });
};
