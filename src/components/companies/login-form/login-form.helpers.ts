import * as yup from "yup";

export const getLoginFormResolverHelper = () =>
  yup.object().shape({
    email: yup
      .string()
      .email("El correo es incorrecto")
      .required("Correo es requerido"),
    password: yup.string().required("Contraseña es requerida"),
  });
