import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addCompanyFavorite,
  deleteCompanyFavorite,
  getCategoriesServices,
  registerCompany,
} from "./company.services";
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

export const useAddCompanyFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation(addCompanyFavorite, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("provider");
    },
  });
};

export const useDeleteCompanyFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCompanyFavorite, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("provider");
    },
  });
};
