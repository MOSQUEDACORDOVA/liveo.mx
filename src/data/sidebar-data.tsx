import { PathNames } from "@/config";
import { IUserRoles } from "@/features/LoginRegisterUser";
import {
  DashboardIcon,
  HelpIcon,
  NotificationIcon,
  ProfileIcon,
  CompaniesProfileIcon,
  SubsIcon,
} from "@/icons";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const LinksSidebarData = [
  {
    name: "Dashboard",
    // href: PathNames.private.dashboard,
    href: "#",
    icon: <DashboardIcon />,
  },
  {
    name: "Mis suscripciones",
    href: PathNames.private.subscriptions,
    icon: <SubsIcon />,
  },
  {
    name: "Voluntades postumas",
    href: PathNames.private.posthumous_wills,
    icon: <InsertDriveFileIcon />,
  },
  {
    name: "Mi perfil",
    href: PathNames.private.profile,
    icon: <ProfileIcon />,
  },
  {
    name: "Mi empresa",
    href: PathNames.companyProfile,
    icon: <CompaniesProfileIcon />,
  },
  {
    name: "Notificaciones",
    // href: PathNames.private.notifications,
    href: "#",
    icon: <NotificationIcon />,
  },
  {
    name: "Ayuda",
    href: PathNames.faq,
    icon: <HelpIcon />,
  },
];

const sectionsCompany = ["Dashboard", "Mi empresa", "Notificaciones", "Ayuda"];
const sectionsDefault = [
  "Dashboard",
  "Mis suscripciones",
  "Voluntades postumas",
  "Mi perfil",
  "Notificaciones",
  "Ayuda",
];

const ROLE_COMPANY = 3;

export const getLinksSidebar = (roles?: IUserRoles[]) => {
  const isCompany = roles?.filter((role) => role.id === ROLE_COMPANY);
  if (isCompany && isCompany?.length)
    return LinksSidebarData.filter((item) =>
      sectionsCompany.includes(item.name)
    );

  return LinksSidebarData.filter((item) => sectionsDefault.includes(item.name));
};
