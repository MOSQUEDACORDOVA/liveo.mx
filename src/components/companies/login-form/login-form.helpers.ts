import * as yup from "yup";

export const getLoginFormResolverHelper = () =>
  yup.object().shape({
    email: yup
      .string()
      .email("El correo electrónico es incorrecto")
      .required("El correo electrónico es requerido"),
    password: yup
      .string()
      .min(6, "La contraseña no es válida")
      .required("La contraseña es requerida"),
  });
