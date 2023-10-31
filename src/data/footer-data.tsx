import { PathNames } from "@/config/Links";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const socialM = [
  {
    icon: <FacebookIcon />,
    link: "",
  },
  {
    icon: <InstagramIcon />,
    link: "",
  },
  {
    icon: <TwitterIcon />,
    link: "",
  },
  {
    icon: <WhatsAppIcon />,
    link: "",
  },
];

export const footerLinks = {
  acercaVitau: {
    title: { name: "Acerca de Liveo" },
    links: [
      {
        name: "Sobre nosotros",
        link: PathNames.us,
      },
      {
        name: "Suscripciones",
        link: PathNames.subscriptions,
      },
      {
        name: "Trabaja con nosotros",
        link: PathNames.workWithUs,
      },
      {
        name: "Contacto",
        link: PathNames.contact,
      },
    ],
  },
  solutions: {
    title: { name: "Soluciones" },
    links: [
      {
        name: "Testamentos",
        link: PathNames.testaments,
      },
      {
        name: "Polizas de Vida",
        link: PathNames.livePolicies,
      },
      {
        name: "Servicios Funerarios",
        link: PathNames.funeralServices,
      },
      {
        name: "Donación de Órganos",
        link: PathNames.organDonation,
      },
      {
        name: "Redes Sociales",
        link: PathNames.socialM,
      },
      {
        name: "Voluntades Postumas",
        link: PathNames.private.posthumous_wills,
      },
      {
        name: "Videos",
        link: PathNames.videos,
      },
    ],
  },
  intesrestLinks: {
    title: { name: "Links de interés" },
    links: [
      {
        name: "Facturación",
        link: PathNames.facturation,
      },
      {
        name: "Blog",
        link: PathNames.blog,
      },
      {
        name: "Centro de Ayuda",
        link: PathNames.help,
      },
      {
        name: "Preguntas frecuentes",
        link: PathNames.faq,
      },
      {
        name: "Aviso de privacidad",
        link: PathNames.privacy,
      },
      {
        name: "Términos y condiciones",
        link: PathNames.terms,
      },
    ],
  },
};
