import { selectDashboardProfile } from "@/features/LoginRegisterUser";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getDocuments } from "./document.services";

export const useGetDocuments = () => {
  const user = useSelector(selectDashboardProfile);
  const { id } = user ?? {};

  return useQuery(["documents", id], getDocuments);
};
