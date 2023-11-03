import { Button, Carrousel, SectionHeader, Title } from "@/components";
import clientIcon from "@/assets/companies/+CLIENTES_ICON.png";
import priceIcon from "@/assets/companies/icon_cotizaaldia.png";
import partnerIcon from "@/assets/companies/icon_socios.png";
import play_vidio from "@/assets/companies/icon_video.png";
import { Paragraph } from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import { getEmpresas, selectCompanies } from "@/features/Empresas";
import { useEffect } from "react";
import { AppDispatch } from "@/features/store";
import { PathNames } from "@/config";
import Login from "./auth/Login";

const headerDataList = [
  "Recibe solicitudes de presupuestos todos los días",
  "Multiplica tus ventas y clentes",
  "Forma partede esta gran red de trabajo",
];

const oferts = [
  {
    icon: clientIcon,
    name: "+ Clientes",
    description:
      "Más clientes estarán conociendo de tus servicios gracias a nuestra plataforma",
  },
  {
    icon: priceIcon,
    name: "Cotizaciones al día",
    description:
      "Recibe por medio de nuestra plataforma cotizaciones para darle seguimiento correcto de venta",
  },
  {
    icon: partnerIcon,
    name: "Socio empresario",
    description:
      "Recibe grandes beneficios como socio empresario, asesoría, capacitación y promociones por profesionales liveo",
  },
];

export const CompaniesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const companies = useSelector(selectCompanies);

  useEffect(() => {
    dispatch(getEmpresas());
  }, []);

  return (
    <div className="min-h-screen mb-72">
      <header className="bg-gradientNavBar w-full grid md:grid-cols-2 px-10 py-14 gap-10 md:gap-32 place-content-center md:place-content-start">
        <div data-aos="fade-left" className="flex flex-col items-end ">
          <Title
            title="¡Se parte de nuestra nueva plataforma liveo!"
            color="white"
            className="mb-6 max-w-[450px]"
          />
          <ul className="text-lg text-white list-disc list-inside marker:text-2xl marker:text-violet">
            {headerDataList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <Login />
      </header>

      <section className="py-32 flex flex-col items-center">
        <SectionHeader type="companies" />
        <div
          data-aos="fade-up"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-[80%] 2xl:w-[70%] mx-auto my-20"
        >
          {oferts.map((item, index) => (
            <div
              key={index}
              className="p-4 flex flex-col justify-start items-center text-center gap-8 group"
            >
              <img
                src={item.icon}
                alt="ofert_icon"
                className="w-32 h-32 group-hover:animate-wiggle"
              />
              <Title Tag="h5" title={item.name} />
              <Paragraph>{item.description}</Paragraph>
            </div>
          ))}
        </div>
        <Button
          text="Registrarte gratis"
          bgColor="violet"
          dataAos="fade-up"
          classNameLink="px-2 text-lg"
          to={PathNames.register_companie}
        />
      </section>

      <section className="bg-companies_divider w-full h-96 bg-cover bg-no-repeat flex justify-center items-center select-none">
        <img
          draggable="false"
          src={play_vidio}
          alt="play_vidio"
          className="opacity-80"
        />
      </section>

      <section className="py-32">
        <SectionHeader type="provider_companies" />
        <div data-aos="fade-up" className="my-20">
          <Carrousel options={companies} />
        </div>
      </section>
    </div>
  );
};
