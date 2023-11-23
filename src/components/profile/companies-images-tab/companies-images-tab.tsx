import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import {
  useDeleteCompanyImageGallery,
  useEditCompanyImageGalleryProfile,
  useEditCompanyProfile,
} from "@/services/auth/auth.services.hooks";
import FileZoneImageGalleryItem from "./filezone-image-gallery-item/filezone-image-gallery-item";
import { IUser, selectDashboardProfile } from "@/features/LoginRegisterUser";

const CompaniesImagesTab = () => {
  const user = useSelector(selectDashboardProfile);
  const { mutateAsync: editCompanyProfile } = useEditCompanyProfile();
  const { mutateAsync: editCompanyImageGalleryProfile } =
    useEditCompanyImageGalleryProfile();
  const { mutateAsync: deleteCompanyImageGallery } =
    useDeleteCompanyImageGallery();

  const { imagen_principal_empresa: imageMainCompany } = user ?? {};
  const { imagenes_empresa: companyImages } = user ?? {};

  const handleEditCompanyImageGalleryProfile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target ?? {};
    if (!files?.length) return;
    await editCompanyImageGalleryProfile(files[0]);
  };

  const handleEditCompanyProfile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target ?? {};
    if (!files?.length) return;
    const userData = {
      ...user,
      imagen_principal_empresa: files[0],
    } as IUser;
    await editCompanyProfile(userData);
  };

  const handleDeleteGalleryImage = async (id?: number) => {
    if (!id) return;
    await deleteCompanyImageGallery(id);
  };

  return (
    <div
      className="flex flex-col gap-8 xl:mb-96 overflow-y-auto lg:overflow-visible"
      style={{ maxHeight: "100vh" }}
    >
      <h5 className="font-semibold lg:text-left mb-2">Mi imagen</h5>
      <h6>Adjuntar imagen principal</h6>
      <FileZoneImageGalleryItem
        name="imagen_principal_empresa"
        onChange={handleEditCompanyProfile}
        document={imageMainCompany}
        onlyEdit
      />
      <h6>Galería de fotografías</h6>
      <Grid
        container
        rowSpacing={1}
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {new Array(6).fill(undefined).map((_, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <FileZoneImageGalleryItem
              name={`file-image-${index}`}
              onChange={handleEditCompanyImageGalleryProfile}
              document={companyImages?.[index]?.url}
              handleDelete={() =>
                handleDeleteGalleryImage(companyImages?.[index]?.id)
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CompaniesImagesTab;
