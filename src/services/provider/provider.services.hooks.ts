import { useQuery } from "react-query";
import { getProvider, getProviderByUrl } from "./provider.services";
import { IUser } from "@/features/LoginRegisterUser";

export const useGetProvider = (id: number) => {
  return useQuery(["provider", id], () => getProvider(id), {
    select: (data) => {
      const { tags } = data;
      const newTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      return { ...data, tags: newTags || [] };
    },
  });
};

export const useGetProvidersByUrl = (url: string) => {
  return useQuery(["provider", url], () => getProviderByUrl(url), {
    select: (data) => {
      const { tags } = data;
      const newTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      return { ...data, tags: newTags || [] } as IUser;
    },
  });
};
