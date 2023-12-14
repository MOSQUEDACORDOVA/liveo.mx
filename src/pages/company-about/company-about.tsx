import { ChooseCards, SectionHeader } from "@/components";
import { Grid } from "@mui/material";
import AboutPNG from "@/assets/homeSlide/img_nosotros.png";

const CompanyAboutPage = () => {
  return (
    <div className="company-about-page overflow-hidden p-6 gap-16 md:mb-[40rem] m-auto md:w-8/12">
      <section className="mt-8">
        <Grid container>
          <Grid item lg={6}>
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-violet font-bold mb-4 text-6xl">
                Sobre nosotros
              </h3>
              <p className="text-xl">
                En Liveo proponemos soluciones de vida para <br /> quienes
                desean vivir en paz en compañía de <br /> los suyos.
              </p>
            </div>
          </Grid>
          <Grid item lg={6}>
            <picture className="min-h-[10rem] block">
              <img src={AboutPNG} alt="" />
            </picture>
          </Grid>
        </Grid>
      </section>
      <section className="text-xl mt-16">
        <p className="mb-6">
          La única plataforma a nivel mundial en la que encontrarás respuestas y
          soluciones brindadas por una gran diversidad de especialistas
          relacionadas en el ciclo de la vida.
        </p>
        <p>
          Al crear tu perfil totalmente gratuito en LIVEO, compartirás
          información relevante para tus seres queridos
        </p>
      </section>
      <section className="px-8 pt-20">
        <Grid
          container
          gap={{ xs: 6, md: 0 }}
          className="text-center md:text-left"
        >
          <Grid item xs={12} md={3}>
            <p className="text-violet font-bold text-6xl mb-6">+10</p>
            <p className="text-xl text-gray-500">
              Más de 10 <br />
              años de experiencia
            </p>
          </Grid>{" "}
          <Grid item xs={12} md={3}>
            <p className="text-ocean font-bold text-6xl mb-6">50</p>
            <p className="text-xl text-gray-500">
              Colaboradores <br />
              100% calificados
            </p>
          </Grid>
          <Grid item xs={12} md={3}>
            <p className="text-light-violet font-bold text-6xl mb-6">800</p>
            <p className="text-xl text-gray-500">
              Servicios
              <br />
              contratados
            </p>
          </Grid>
          <Grid item xs={12} md={3}>
            <p className="text-violet font-bold text-6xl mb-6">+1000</p>
            <p className="text-xl text-gray-500">
              Más de 1000 clientes <br />
              en linea
            </p>
          </Grid>
        </Grid>
      </section>
      <section className="mt-24">
        <SectionHeader type="why-choose-us" />
        <ChooseCards />
      </section>
    </div>
  );
};

export default CompanyAboutPage;
