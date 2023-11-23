import { PathNames } from "@/config/Links";
import { IUserRoles } from "@/features/LoginRegisterUser";
import { getIsCompany } from "@/utils/company-utils";

export const getLinks = (roles?: IUserRoles[]) => {
  const pathDashboard = getIsCompany(roles)
    ? PathNames.companyProfile
    : PathNames.private.dashboard;
  return [
    {
      name: "Inicio",
      url: PathNames.home,
    },
    {
      name: "Sobre Liveo",
      url: "#",
    },
    // {
    //   name: "Planes",
    //   url: PathNames.plans,
    //   url: "#",
    // },
    {
      name: "Servicios",
      url: PathNames.services,
    },
    {
      name: "Blog",
      // url: PathNames.blog,
      url: "#",
    },
    {
      private: true,
      name: "Dashboard",
      url: pathDashboard,
    },
  ];
};
