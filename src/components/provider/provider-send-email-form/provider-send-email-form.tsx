import TextField from "@/components/material_ui/text-field/text-field";
import { useForm } from "react-hook-form";
import { ProviderSendEmailFormValues } from "./provider-send-email-form.types";
import { getProviderSendEmailDefaultValuesHelper } from "./provider-send-email-form.helpers";
import { getProviderSendEmailResolverHelper } from "./provider-send-email-form.helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCompanySendEmail } from "@/services/company/company.services.hooks";
import { toast } from "react-toastify";
import Button from "@/components/global/button/button";

export const ProviderSendEmailForm = () => {
  const { mutateAsync: companySendEmail, isLoading } = useCompanySendEmail();
  const form = useForm<ProviderSendEmailFormValues>({
    mode: "onChange",
    defaultValues: getProviderSendEmailDefaultValuesHelper(),
    resolver: yupResolver(getProviderSendEmailResolverHelper()),
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  const onSubmit = async (values: ProviderSendEmailFormValues) => {
    try {
      await companySendEmail(values);
      toast.success("Correo enviado");
    } catch (error) {
      toast.error("Error al enviar el correo");
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nombre"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
      />
      <TextField
        label="Correo electrónico"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />
      <TextField
        label="Mensaje"
        multiline
        minRows={3}
        maxRows={10}
        fullWidth
        sx={{ borderRadius: 50 }}
        error={!!errors.message}
        helperText={errors.message?.message}
        {...register("message")}
      />

      <Button
        type="submit"
        bgColor="violet"
        className="p-2 px-16 text-lg"
        disabled={isLoading}
        loading={isLoading}
      >
        Enviar
      </Button>
    </form>
  );
};
