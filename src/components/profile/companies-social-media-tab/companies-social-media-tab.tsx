import TextField from "@/components/material_ui/text-field/text-field";
import { InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { CompaniesSocialMediaValues } from "./companies-socal-media.types";
import { Button } from "@/components";

const CompaniesSocialMediaTab = () => {
  const form = useForm<CompaniesSocialMediaValues>({
    defaultValues: {
      urlFacebook: "",
      urlInstagram: "",
      urlTikTok: "",
    },
  });
  const { register, handleSubmit } = form;

  const onSubmit = (values: CompaniesSocialMediaValues) => {};

  return (
    <div className="flex flex-col gap-8">
      <h5 className="font-semibold lg:text-left mb-2">Redes sociales</h5>
      <form
        id="socialMediaForm"
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-1 gap-4"
      >
        <InputLabel>Link Facebook</InputLabel>
        <TextField
          label=""
          placeholder="https://www.facebook.com/floreriasamillionflowers"
          {...register("urlFacebook")}
        />
        <InputLabel>Link Instagram</InputLabel>
        <TextField
          label=""
          placeholder="https://www.facebook.com/floreriasamillionflowers"
          {...register("urlInstagram")}
        />
        <InputLabel>Link Tiktok</InputLabel>
        <TextField
          label=""
          placeholder="https://www.facebook.com/floreriasamillionflowers"
          {...register("urlTikTok")}
        />
      </form>
      <div className="mb-5 flex justify-end gap-6 z-50">
        <Button
          type="submit"
          text="Guardar"
          bgColor="light-violet"
          classNameLink="w-40"
          form="socialMediaForm"
        />
        <Button
          text="Cancelar"
          bgColor="none"
          textColor="light-violet"
          border
          borderColor="light-violet"
          classNameLink="w-40"
        />
      </div>
    </div>
  );
};

export default CompaniesSocialMediaTab;
