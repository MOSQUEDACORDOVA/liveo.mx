import { useQuery } from "react-query";
import { getProvider, getProviderByUrl } from "./provider.services";

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
  return useQuery(["providers", url], () => getProviderByUrl(url), {
    select: (data) => {
      const { tags } = data;
      const newTags = typeof tags === "string" ? JSON.parse(tags) : tags;
      return { ...data, tags: newTags || [] };
    },
  });
};
