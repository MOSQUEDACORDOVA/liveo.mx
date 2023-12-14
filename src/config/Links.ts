export const PathNames = {
  error: "*",
  home: "/",
  us: "/sobre-liveo",
  services: "/servicios",
  service: "/servicios/:id",
  blog: "/blog",
  account: "/cuenta",
  providers: "/proveedores",
  provider: "/proveedor/:url",
  privacy: "/aviso-de-privacidad",
  terms: "/terminos-y-condiciones",
  help: "/ayuda",
  faq: "/preguntas-frecuentes",
  facturation: "/facturacion",
  login: "/iniciar-sesion",
  register: "/registrarse",
  register_companie: "/registrar-empresa",
  companyProfile: "/empresa-perfil",
  companyAbout: "/nosotros",

  subscriptions: "/suscripciones",
  workWithUs: "/trabaja-con-nosotros",
  contact: "/contacto",
  livePolicies: "/polizas-de-vida",
  plans: "/planes",
  testaments: "/testamentos",
  funeralServices: "/servicios-funerarios",
  organDonation: "/donacion-organos",
  socialM: "/redes-sociales",
  videos: "/videos",
  companies: "/empresas",
  reactivate_account: "/reactivar-cuenta",

  private: {
    dashboard: "/dashboard",
    companyDashboard: "/empresa-dashboard",
    subscriptions: "/mis-suscripciones",
    profile: "/perfil",
    notifications: "/notificaciones",
    closeSession: "/",
    posthumous_wills: "/voluntades-postumas",
    posthumous_wills_new: "/voluntades-postumas/nueva",
    posthumous_wills_edit: "/voluntades-postumas/editar",
  },
} as const;
