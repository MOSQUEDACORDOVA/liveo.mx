import { IUserRoles } from "@/features/LoginRegisterUser";

export const getIsCompany = (roles?: IUserRoles[]) => {
  return roles?.filter((role) => role.name === "Empresa");
};
