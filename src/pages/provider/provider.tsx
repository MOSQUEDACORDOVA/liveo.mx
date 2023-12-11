import { useParams } from "react-router-dom";
import BannerGrid from "@/components/notary/banner-grid/banner-grid";
import { BadgeOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { FiberManualRecordRounded } from "@mui/icons-material";
import { FavoriteOutlined, PhoneAndroidOutlined } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useGetProvidersByUrl } from "@/services/provider/provider.services.hooks";
import { ProviderSendEmailForm } from "@/components/provider/provider-send-email-form/provider-send-email-form";
import { useQueryClient } from "react-query";
import { useDeleteCompanyFavorite } from "@/services/company/company.services.hooks";
import { useAddCompanyFavorite } from "@/services/company/company.services.hooks";

const ProviderPage = () => {
  const { url = "" } = useParams();
  const queryClient = useQueryClient();
  const { data } = useGetProvidersByUrl(url);
  const { mutateAsync: addCompanyFavorite, isLoading: addCompanyLoading } =
    useAddCompanyFavorite();
  const {
    mutateAsync: deleteCompanyFavorite,
    isLoading: deleteCompanyLoading,
  } = useDeleteCompanyFavorite();

  const { name, tipo_sector, descripcion, tags = [], telefono } = data ?? {};
  const { iframe_google, dir_calle, dir_colonia, dir_ciudad } = data ?? {};
  const { celular, email, imagen_principal_empresa, avatar } = data ?? {};
  const { imagenes_empresa = [], isFav } = data ?? {};

  const handleFavorite = async () => {
    if (!data) return;
    if (isFav) {
      await deleteCompanyFavorite({ companyId: Number(data.id) });
    } else {
      await addCompanyFavorite({ companyId: Number(data.id) });
    }
    queryClient.invalidateQueries("providers");
  };

  return (
    <div className="notary-page overflow-hidden p-6 gap-16 md:mb-[40rem] mb-[10rem] max-w-6xl m-auto">
      <section className="flex justify-center items-center gap-16 mb-10 mt-10 xl:mb-20 xl:mt-20">
        <BannerGrid
          mainImage={imagen_principal_empresa}
          secondaryImages={imagenes_empresa}
        />
      </section>
      <section>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <picture className="mr-6 border shadow-md rounded-full p-4">
              <img src={`${avatar}`} className="w-8 h-8" alt="logo" />
            </picture>
            <div>
              <p className="text-2xl font-bold">{name}</p>
              <p className="text-sm font-medium">
                {tipo_sector}&nbsp;
                <IconButton
                  className="p-0 bg-transparent"
                  onClick={handleFavorite}
                  disabled={addCompanyLoading || deleteCompanyLoading}
                >
                  {isFav ? (
                    <FavoriteOutlined className="w-4" />
                  ) : (
                    <FavoriteBorderOutlined className="w-4" />
                  )}
                </IconButton>
              </p>
            </div>
          </div>
          <div className="rounded-full bg-light-violet p-4 text-white text-sm">
            <BadgeOutlined />
          </div>
        </div>
        <Grid
          container
          spacing={{ md: 4 }}
          columns={{ md: 12 }}
          className="mt-8"
        >
          <Grid
            item
            md={7}
            className="text-sm text-gray-600 text-justify border-b border-b-gray-200"
          >
            <p className="mb-4">{descripcion}</p>
          </Grid>
          <Grid item md={5}>
            {iframe_google ? (
              <div
                className="mt-5 md:mt-0 max-h-72 overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: `${iframe_google}`,
                }}
              ></div>
            ) : (
              <p className="text-sm font-bold text-center">
                No se registro ubicación
              </p>
            )}
          </Grid>
        </Grid>
      </section>
      <section className="pt-6">
        <h3 className="text-3xl font-bold">Servicios</h3>
        {tags?.length ? (
          <ul className="flex gap-2 text-lg mt-6">
            {tags?.map((tag: string, index: number) => (
              <li key={index}>
                <FiberManualRecordRounded className="text-light-violet mr-4" />
                {tag}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm font-bold mt-10">No se registraron servicios</p>
        )}
      </section>
      <hr className="my-8" />
      <section>
        <h3 className="text-3xl font-bold">Contacto</h3>
        <Grid container columns={12} className="mt-6">
          <Grid item md={6} xs={12}>
            <ProviderSendEmailForm />
          </Grid>
          <Grid item md={6} xs={12} className="md:pl-20 md:mt-0 mt-10 ">
            <div>
              <h3 className="text-3xl font-bold flex justify-start items-center">
                <div className="rounded-full bg-light-violet p-2 text-white text-xs mr-4">
                  <BadgeOutlined />
                </div>
                Ubicación
              </h3>
              <p className="text-sm mt-4">
                {dir_calle} {dir_colonia} {dir_ciudad}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold flex justify-start items-center">
                <div className="rounded-full bg-light-violet p-2 text-white text-xs mr-4">
                  <PhoneAndroidOutlined />
                </div>
                Teléfono
              </h3>
              <p className="text-sm mt-4">{telefono}</p>
              <p className="text-sm">{celular}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold flex justify-start items-center">
                <div className="rounded-full bg-light-violet p-2 text-white text-xs mr-4">
                  <BadgeOutlined />
                </div>
                Correo Electrónico
              </h3>
              <p className="text-sm mt-4">{email}</p>
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default ProviderPage;
