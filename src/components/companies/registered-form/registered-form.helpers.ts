import * as yup from "yup";
import { RegisteredFormValues } from "./registered-form.types";

export const getDefaultValues = (): RegisteredFormValues => ({
  name: "",
  city: "",
  colony: "",
  sectorType: "",
  sector: "",
  email: "",
  phoneNumber: "",
  password: "",
  prefix: "+1",
});

export const getResolverValues = () =>
  yup.object().shape({
    id: yup.number(),
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
    prefix: yup.string().required("El prefijo es requerido"),
    password: yup
      .string()
      .min(6, "Mínimo 6 caracteres")
      .required("La contraseña es requerida"),
    privacy: yup.boolean().isTrue("Debes aceptar los términos"),
  });
