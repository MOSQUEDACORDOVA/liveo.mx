import CustomSelect from "@/components/material_ui/custom-select/custom-select";
import { CategoryService } from "@/models/category.model";
import { useGetCategoriesServices } from "@/services/company/company.services.hooks";
import { Chip, InputLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { CompaniesServiceValues } from "./companies-service-tab.types";
import { toast } from "react-toastify";
import { Button } from "@/components";

const CompaniesServiceTab = () => {
  const { data: categoriesServices = [] } = useGetCategoriesServices();
  const form = useForm<CompaniesServiceValues>({
    defaultValues: {
      service: "",
      typeService: "",
      tags: [],
      tag: "",
    },
  });

  const { register, handleSubmit, formState, getValues, watch, setValue } =
    form;
  const { errors } = formState;
  const { tags } = watch();

  const onSubmit = (values: CompaniesServiceValues) => {};

  const handleDeleteTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setValue("tags", newTags);
  };

  const handleAddTag = (tagValue: string) => {
    const isTagExist = tags.find((tag) => tag === tagValue);
    if (isTagExist) {
      toast("El tag ya existe", { type: "error" });
      return;
    }
    const newTags = [...tags, tagValue];
    setValue("tags", newTags);
    setValue("tag", "");
  };

  return (
    <div className="flex flex-col gap-8">
      <h5 className="font-semibold lg:text-left mb-2">Mis servicios</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-1 gap-4">
          <InputLabel htmlFor={"service"}>Categoria de servicio</InputLabel>
          <CustomSelect
            options={categoriesServices}
            getIdOption={(option) => `${(option as CategoryService).id}`}
            getLabelOption={(option) => `${(option as CategoryService).name}`}
            getValueOption={(option) => `${(option as CategoryService).name}`}
            defaultValue=""
            label=""
            {...register("service")}
          />
          <InputLabel htmlFor={"typeService"}>
            Tipos de servicios que atiende
          </InputLabel>
          <TextField
            size="small"
            label=""
            error={!!errors.typeService}
            helperText={errors.typeService?.message}
            fullWidth
            {...register("typeService")}
          />
          <InputLabel htmlFor={"typeService"}>Tags</InputLabel>
          <TextField
            size="small"
            label=""
            error={!!errors.typeService}
            helperText={errors.typeService?.message}
            fullWidth
            {...register("tag")}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              const tagValue = getValues().tag ?? "";
              handleAddTag(tagValue);
            }}
          />
          <div>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                className="bg-light-violet text-white mr-2"
              />
            ))}
          </div>
        </div>
      </form>
      <div className="mb-5 flex justify-end gap-6 z-50">
        <Button
          type="submit"
          text="Guardar"
          bgColor="light-violet"
          classNameLink="w-40"
          form="companyAccountForm"
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

export default CompaniesServiceTab;
