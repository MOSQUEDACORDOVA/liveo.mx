import { IUser } from "@/features/LoginRegisterUser";
import * as yup from "yup";
import CompaniesAccountValues from "./companies-account.types";

export const getCompanyAccountDefaultValuesHelper = (
  defaultValues?: IUser | null
): CompaniesAccountValues => ({
  name: defaultValues?.name || "",
  apellido: defaultValues?.apellido || "",
  celular: defaultValues?.celular || "",
  dir_ciudad: defaultValues?.dir_ciudad || "",
  dir_colonia: defaultValues?.dir_colonia || "",
  dir_pais: defaultValues?.dir_pais || "",
  email: defaultValues?.email || "",
  telefono: defaultValues?.telefono || "",
  dir_calle: defaultValues?.dir_calle || "",
  dir_postal: defaultValues?.dir_postal || "",
  nacimiento: defaultValues?.nacimiento || "",
  descripcion: defaultValues?.descripcion || "",
  web_site: defaultValues?.web_site || "",
});

export const getCompanyAccountResolverHelper = () =>
  yup.object().shape({
    name: yup.string().trim().required("El nombre es requerido"),
    apellido: yup.string().trim().required("El slogan es requerido"),
    celular: yup.string().trim().required("El celular es requerido"),
    dir_ciudad: yup.string().trim(),
    dir_colonia: yup.string().trim(),
    dir_pais: yup.string().trim(),
    email: yup
      .string()
      .trim()
      .required("El correo es requerido")
      .email("El correo no es valido"),
    telefono: yup.string().trim(),
    dir_calle: yup.string().trim(),
    dir_postal: yup.string().trim(),
    nacimiento: yup.string().trim(),
    web_site: yup.string().trim(),
    descripcion: yup.string().trim(),
  });
