import { RegisteredCompanyRequest } from "@/types/company.types";
import * as yup from "yup";

export const getDefaultValues = (): RegisteredCompanyRequest => ({
  name: "",
  city: "",
  colony: "",
  sectorType: "",
  sector: "",
  email: "",
  phoneNumber: "",
  userName: "",
  password: "",
});

export const getResolverValues = () =>
  yup.object().shape({
    name: yup.string().trim().required("El nombre es requerido"),
    colony: yup.string().required("La colonia es requerida"),
    city: yup.string().trim().required("La ciudad es requerida"),
    sectorType: yup.string().required("El tipo de sector es requerido"),
    sector: yup.string().required("El sector es requerido"),
    email: yup
      .string()
      .required("El correo es requerido")
      .email("El correo no es valido"),
    phoneNumber: yup.string().required("El teléfono es requerido"),
    userName: yup.string().required("El usuario es requerido"),
    password: yup
      .string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es requerida"),
    privacy: yup.boolean().isTrue("Debes aceptar los términos"),
  });
