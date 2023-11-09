import { CategoryService } from "@/models/category.model";
import { useGetCategoriesServices } from "@/services/company/company.services.hooks";
import { Autocomplete, InputLabel, TextField } from "@mui/material";

const CompaniesServiceTab = () => {
  const { data: categoriesServices = [], isLoading } =
    useGetCategoriesServices();

  console.log({ categoriesServices });

  const handleChangeCategoryServices = (value: CategoryService[]) => {
    console.log({ value });
  };

  return (
    <div className="flex flex-col gap-8 ">
      <h5 className="font-semibold lg:text-left mb-2">Mis servicios</h5>
      <form>
        <InputLabel htmlFor={"service"}>Categoria de servicio</InputLabel>
        <Autocomplete
          multiple
          id="services"
          options={categoriesServices}
          getOptionLabel={(option: CategoryService) => option.name}
          onChange={(_, value) => handleChangeCategoryServices(value)}
          size="small"
          loading={isLoading}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="" size="small" />
          )}
        />
      </form>
    </div>
  );
};

export default CompaniesServiceTab;
