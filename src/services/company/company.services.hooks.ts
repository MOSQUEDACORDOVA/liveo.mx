import { useMutation, useQuery } from "react-query";
import { getCategoriesServices, registerCompany } from "./company.services";
import { searchCompanies, companySendEmail } from "./company.services";
import { getCompanies } from "./company.services";

export const useRegisterCompany = () => {
  return useMutation(registerCompany);
};

export const useGetCategoriesServices = () => {
  return useQuery("categories", getCategoriesServices, {
    retry: 1,
    staleTime: 5 * 1000 * 60,
  });
};

export const useGetCompanies = () => {
  return useQuery("companies", getCompanies, {
    retry: 1,
    staleTime: 5 * 1000 * 60,
  });
};

export const useGetQueryCompanies = (query: string) => {
  return useQuery(["companies", query], () => searchCompanies(query));
};

export const useCompanySendEmail = () => {
  return useMutation(companySendEmail);
};
