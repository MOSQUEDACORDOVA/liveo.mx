import * as yup from "yup";

export const getProviderSendEmailDefaultValuesHelper = () => ({
  name: "",
  email: "",
  message: "",
});

export const getProviderSendEmailResolverHelper = () =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, "Nombre muy corto (mínimo 3 caracteres)")
      .required("El nombre es requerido"),
    email: yup
      .string()
      .trim()
      .required("El correo es requerido")
      .email("El correo no es valido"),
    message: yup.string().trim().required("El mensaje es requerido"),
  });
