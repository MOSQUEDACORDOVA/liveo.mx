import { PathNames } from "@/config";
import {
  DashboardIcon,
  HelpIcon,
  NotificationIcon,
  ProfileIcon,
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
