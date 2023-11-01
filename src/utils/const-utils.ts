import { IInitialFormValues } from "@/pages/services/subscription/SuscriptionPage";
import dayjs from "dayjs";

export type IINPUTNAMES = (typeof INPUTNAMES)[keyof typeof INPUTNAMES];

export const INPUTNAMES = {
  NAME: "name",
  SURNAME: "apellido",
  EMAIL: "email",
  BIRTH_DATE: "nacimiento",
  CELL_PHONE: "celular",
  PHONE: "telefono",
  STREET: "dir_calle",
  COLONY: "dir_colonia",
  CITY: "dir_ciudad",
  ZIP_CODE: "dir_postal",
  COUNTRY: "dir_pais",
  PASSWORD: "password",
  AVATAR: "avatar",
  STATE: "estado",
  TYPE_SECTOR: "Tipo de sector",
  ACTIVITY_SECTOR: "Sector de actividad",
  DATE: "date",
  TIME: "time",
  NOTARIES: "notaries",
  WILL: "will",
  LETTER_TO_NAME: "latter_name",
  LETTER_TO_SURNAME: "latter_surname",
  LETTER_TO_ALIAS: "latter_alias",
  LETTER_TO_RELATION: "latter_relation",
  LETTER_COMMENTS: "latter_comments",
  LETTER_MESSAGE: "latter_message",
  SOCIAL_MEDIA_FACEBOOK: "facebook",
  SOCIAL_MEDIA_TIKTOK: "tiktok",
  SOCIAL_MEDIA_INSTAGRAM: "instagram",
  ADDRESSEE: "destinatario",
  SELECT_TESTAMENT_TYPE: "tipo",
  COMPANIE_NAME: "Nombre del negocio",
  COMPANIE_SLOGAN: "Slogan",
  COMPANIE_DESCRIPTION: "Descripción",
  
} as const;

export const INPUTLABELS = {
  NAME: "Nombre",
  NAME_COMPANIE: "Nombre de la empresa",
  NAME_USER: "Nombre de usuario",
  SURNAME: "Apellidos",
  EMAIL: "Correo Electrónico",
  BIRTH_DATE: "Fecha de nacimiento",
  CELL_PHONE: "Celular",
  PHONE: "Teléfono",
  STREET: "Calle",
  COLONY: "Colonia",
  CITY: "Ciudad",
  ZIP_CODE: "Código postal",
  COUNTRY: "País",
  PASSWORD: "Contraseña",
  STATE: "Estado",
  TYPE_SECTOR: "Tipo de sector",
  ACTIVITY_SECTOR: "Sector de actividad",
  DATE_APPOINTMENT: "Fecha de la cita",
  TIME_APPOINTMENT: "Hora de la cita",
  NOTARIES: "Notarías",
  LETTER_TO_NAME: "Nombre del Destinatario",
  LETTER_TO_SURNAME: "Apellido del Destinatario",
  LETTER_TO_ALIAS: "Alias del Destinatario",
  LETTER_TO_RELATION: "Relacion con el Destinatario",
  SOCIAL_MEDIA_FACEBOOK: "Facebook",
  SOCIAL_MEDIA_TIKTOK: "TikTok",
  SOCIAL_MEDIA_INSTAGRAM: "Instagram",
  ADDRESSEE: "Destinatario",
  SELECT_TESTAMENT_TYPE: "Selecciona un servicio",
  COMPANIE_NAME: "Nombre del negocio",
  COMPANIE_SLOGAN: "Slogan",
  COMPANIE_DESCRIPTION: "Descripción",
} as const;

export const INPUTPLACEHOLDERS = {
  WILL: "Voluntades",
  LETTER_COMMENTS: "Comentario o Sugerencia",
  LETTER_MESSAGE: "Mensaje",
} as const;

export const STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Coahuila de Zaragoza",
  "Colima",
  "Chiapas",
  "Chihuahua",
  "Distrito Federal",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "México",
  "Michoacán de Ocampo",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca de Juárez",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz de Ignacio de la Llave",
  "Yucatán",
  "Zacatecas",
];

export type ITABSID = (typeof TABSID)[keyof typeof TABSID];

export const TABSID = {
  ACCOUNT_PROFILE: "account",
  SERVICE_PROFILE: "services",
  DOCUMENTS_PROFILE: "documents",
  VAULT: "vault",
  AUT_PERSON_PROFILE: "auth_person",
  CONFIGURATION_PROFILE: "config",
} as const;

export const SERVICE_TYPE = {
  WILL: "Voluntades",
  TESTAMENT: "Testamento",
  LETTER: "Carta",
  SOCIAL_MEDIA: "Redes Sociales",
  GENERAL: "General",
} as const;

export const handleCompareSameNestedObject = (
  first: IInitialFormValues,
  seccond: IInitialFormValues
) => {
  const group: boolean[] = [];
  function compareNestedObjectValues<T extends IInitialFormValues>(
    firstKey: T,
    secondKey: T
  ) {
    if (dayjs.isDayjs(firstKey.value) && dayjs.isDayjs(secondKey.value)) {
      group.push(dayjs(firstKey.value).isSame(secondKey.value));
    } else group.push(firstKey.value === secondKey.value);
  }

  for (const [key] of Object.entries(first)) {
    compareNestedObjectValues(first[key], seccond[key]);
  }

  return group.every((item) => item === true);
};

export const handleSomeIsEmpty = (anObject: IInitialFormValues) =>
  Object.values(anObject)
    .map((value) => value.value === "")
    .some((item) => item === true);
