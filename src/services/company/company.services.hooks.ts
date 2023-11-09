import { useMutation, useQuery } from "react-query";
import { getCategoriesServices, registerCompany } from "./company.services";
import { useSelector } from "react-redux";
import { selectDashboardProfile } from "@/features/LoginRegisterUser";

export const useRegisterCompany = () => {
  return useMutation(registerCompany);
};

export const useGetCategoriesServices = () => {
  const user = useSelector(selectDashboardProfile);
  const { id } = user ?? {};

  return useQuery("categories", getCategoriesServices, {
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 1000 * 60,
  });
};
