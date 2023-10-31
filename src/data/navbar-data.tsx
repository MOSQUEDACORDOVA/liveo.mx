import { PathNames } from "@/config/Links";

export const links = [
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
    url: PathNames.private.profile,
  },
];
