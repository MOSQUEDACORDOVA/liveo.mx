import {
  Accordion,
  Button,
  Carrousel,
  Gallery,
  Sanitize,
  SectionHeader,
} from "@/components";
import { Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppDispatch } from "@/features/store";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CloseIcon from "@mui/icons-material/Close";
import {
  getServiceById,
  resetError,
  selectServiceError,
  selectServiceInfo,
  selectServiceLoading,
} from "@/features/Service";
import {
  ServiceData,
  resetServicesError,
  selectServicesError,
  selectServicesInfo,
  selectServicesLoading,
} from "@/features/HomeSlice";
import { useHandleStrings, useScrollToTop } from "@/hook";
import { Suspense } from "@/layout/Suspense";
import { Divider, IconButton, Modal } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { PathNames } from "@/config";
import { Single70PercentPage } from "@/layout";
import { setItemLocalStorage, storage_names } from "@/config/LocalStorage";
import { selectIsLogged } from "@/features/LoginRegisterUser";
import { getEmpresas, selectCompanies } from "@/features/Empresas";

export const ServiceInside = () => {
  const serviceInfo = useSelector(selectServiceInfo);
  const servicesInfo = useSelector(selectServicesInfo);
  const loading = useSelector(selectServiceLoading);
  const servicesLoading = useSelector(selectServicesLoading);
  const error = useSelector(selectServiceError);
  const serviceSerror = useSelector(selectServicesError);
  const userIsLogged = useSelector(selectIsLogged);
  const dispatch = useDispatch<AppDispatch>();
  const { handleBuildPath } = useHandleStrings();
  const { id } = useParams();
  const { handleScrollToTop } = useScrollToTop();
  const companies = useSelector(selectCompanies);

  useEffect(() => {
    dispatch(getEmpresas());
  }, []);
  useEffect(() => handleScrollToTop(), []);

  const [openModal, setOpenModal] = useState(false);

  const handleFindService = () => {
    const serviceId = servicesInfo.find(
      (serv) => id === handleBuildPath(serv.name)
    )?.id;
    dispatch(getServiceById(serviceId));
    serviceId && setItemLocalStorage(storage_names.service, serviceId);
  };

  const handleServiceId = () => {
    if (servicesInfo.length === 0) {
      dispatch(ServiceData())
        .unwrap()
        .then(() => handleFindService());
    } else if (servicesInfo.length !== 0) handleFindService();
  };

  useEffect(() => {
    id && handleServiceId();
  }, [servicesInfo, id]);

  useEffect(() => {
    error && dispatch(resetError());
    serviceSerror && dispatch(resetServicesError());
  }, [error, serviceSerror]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center pb-20">
      <Modal keepMounted open={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-[90%] lg:w-[40%] bg-white m-auto top-1/2 relative -translate-y-1/2 rounded-2xl p-10 flex flex-col gap-8 items-center overflow-hidden justify-between">
          <IconButton
            onClick={() => setOpenModal(false)}
            className="absolute top-4 right-4"
          >
            <CloseIcon />
          </IconButton>
          <div className="flex items-center flex-col gap-6">
            <span className="shadow-light-black shadow-md rounded-full overflow-hidden p-2">
              <img
                src={serviceInfo?.logo}
                alt="service-icon"
                className="w-32 h-32 p-4"
              />
            </span>
            <h4 className="text-violet font-bold text-center">
              {userIsLogged
                ? "¿Estás seguro de contratar este servicio?"
                : "Recuerda que para contratar servicio debes de tener cuenta liveo"}
            </h4>
          </ div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              to={userIsLogged ? PathNames.subscriptions : PathNames.login}
              classNameLink="min-w-[150px] text-xl py-1"
              text="Si"
              bgColor="violet"
            />
            <Button
              onClick={() => setOpenModal(false)}
              classNameLink="min-w-[150px] text-xl py-1"
              text="Cancelar"
              border
              textColor="violet"
              borderColor="violet"
              bgColor="white"
            />
          </div>
        </div>
      </Modal>
      <Suspense
        loading={loading || servicesLoading || servicesInfo?.length === 0}
        error={error || serviceSerror}
        errorMessage="No se pudo cargar el servicio"
        type="linear"
      >
        <Single70PercentPage className="sm:pb-0 pb-0">
          <Gallery imgs={serviceInfo?.gallery} />
          <Header
            icon={serviceInfo?.logo}
            name={serviceInfo?.name}
            onClick={() => setOpenModal(true)}
          />
          <Sanitize html={serviceInfo?.longDescription} />
          <Divider />
          {/* HOW WORK AND SERVICE */}
          <div
            data-aos="fade-up"
            className="grid gap-6 md:grid-cols-2 md:gap-24"
          >
            <div className="">
              <h5 className="font-bold leading-tight">
                {serviceInfo?.how_work.quest}
              </h5>
              <p className="text-lg">
                {serviceInfo?.how_work.response
                  ? serviceInfo?.how_work.response
                  : "Escriba una respuesta."}
              </p>
            </div>
            <div className="">
              <h5 className="font-bold">Servicios</h5>

              {serviceInfo?.services.map((item, index) => (
                <li
                  className="text-lg flex items-center gap-4 mt-4"
                  key={index}
                >
                  <FiberManualRecordIcon className="text-light-violet text-xs" />
                  <p>{item}</p>
                </li>
              ))}
            </div>
          </div>
          {/* VIDIOS */}
          <div data-aos="fade-up" className="grid md:grid-cols-2 gap-6">
            <iframe
              src={`https://www.youtube.com/embed/${
                serviceInfo?.vidio_url[0] && serviceInfo.vidio_url[0].slice(32)
              }`}
              title="video"
              className="w-full min-h-[250px]"
            />
            <iframe
              src={`https://www.youtube.com/embed/${
                serviceInfo?.vidio_url[1] && serviceInfo.vidio_url[1].slice(32)
              }`}
              title="video"
              className="w-full min-h-[250px]"
            />
          </div>
          <Divider />
          {/* FAQS */}
          <div data-aos="fade-up" className="">
            <h5 className="mb-6 font-bold">
              Respondemos todas tus preguntas en Liveo
            </h5>
            <Accordion
              icon={<KeyboardArrowDownIcon className="text-white" />}
              classNameContainer="shadow-none"
              textColor="white"
              className="bg-light-violet"
              expandedNow={serviceInfo?.name}
              child={
                <div className="grid lg:grid-cols-2 gap-6">
                  {serviceInfo &&
                    serviceInfo.faqs.map((item, index) => (
                      <Accordion
                        classNameContainer="min-h-[100px] h-fit flex flex-col place-content-center"
                        key={index}
                        name={item?.quest}
                        title={item?.quest}
                        description={item?.response}
                      />
                    ))}
                </div>
              }
              title={serviceInfo !== null ? serviceInfo.name : "Pregunta"}
              name={serviceInfo !== null ? serviceInfo.name : "Pregunta"}
            />
          </div>
        </Single70PercentPage>
        <section className="py-32 sm:mb-72">
          <SectionHeader type="provider_companies" />
          <div data-aos="fade-up" className="my-20">
            <Carrousel options={companies} />
          </div>
        </section>
      </Suspense>
    </div>
  );
};
