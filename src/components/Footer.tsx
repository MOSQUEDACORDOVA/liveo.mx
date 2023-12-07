import waveF from "@/assets/footer/img_footer.png";
import logoF from "@/assets/footer/logofooter.png";
import ribbon from "@/assets/footer/icon_footer.png";
import { footerLinks, socialM } from "@/data/footer-data";
import { Link } from "react-router-dom";
import { AwsIcon } from "@/icons";
import { useScrollToTop } from "@/hook";
import cloud from "@/assets/footer/cloud.png";
import { useDispatch } from "react-redux";
import { setShowReportDeceased } from "@/features/HomeSlice";

export const Footer = () => {
  const { handleScrollToTop } = useScrollToTop();
  const dispatch = useDispatch();

  const handleShowFloatingForm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(setShowReportDeceased("toggle"));
  };

  return (
    <div className="relative text-white bg-[#2d1d3d]">
      <img
        src={waveF}
        alt="waveF"
        className="w-full -translate-y-[90%] z-20"
        draggable={false}
      />
      <img
        src={ribbon}
        alt="ribbon"
        className="absolute top-0 right-0 w-1/2 lg:w-[32%] lg:-top-[45%]  hidden md:block z-10"
      />

      <AwsIcon className="absolute -top-24 lg:-top-48 right-[10%] lg:right-[20%] w-40 h-40 z-20" />
      <div className="bg-[#2d1d3d] h-[1200px] sm:h-[800px] lg:h-[550px] absolute inset-0 flex flex-col justify-between p-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:w-[70%] lg:ml-20 lg:place-items-start gap-6 z-20">
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-6">
            <img src={logoF} alt="logoF" className="w-[250px]" />
            <p className="text-sm">
              La plataforma que te ayudará a vivir en paz, plataforma jurífica
              brinda asesoría y servicios para el día de nuestra partida.
            </p>
            <ul className="flex gap-2">
              {socialM.map((item, index) => (
                <Link
                  to={item.link}
                  key={index}
                  className="bg-light-violet flex w-fit rounded-full p-1 hover:-translate-y-1 duration-200"
                >
                  {item.icon}
                </Link>
              ))}
            </ul>
            <button onClick={handleShowFloatingForm} className={`w-48 mt-4`}>
              <img src={cloud} alt="cloud" />
            </button>
          </div>
          {/* END */}

          {/* COLUMN 2  */}
          <div className="place-content-center">
            <h5 className="font-bold">{footerLinks.acercaVitau.title.name}</h5>
            <ul className="text-sm flex flex-col gap-2">
              {footerLinks.acercaVitau.links.map((item, index) => (
                <Link
                  onClick={handleScrollToTop}
                  to={item.link}
                  key={index}
                  className="hover:text-light-violet"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
          {/* END */}
          {/* COLUMN 3  */}
          <div className="place-content-center">
            <h5 className="font-bold">{footerLinks.solutions.title.name}</h5>
            <ul className="text-sm flex flex-col gap-2">
              {footerLinks.solutions.links.map((item, index) => (
                <Link
                  onClick={handleScrollToTop}
                  to={item.link}
                  key={index}
                  className="hover:text-light-violet"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
          {/* END */}
          {/* COLUMN 4  */}
          <div className="">
            <h5 className="font-bold">
              {footerLinks.intesrestLinks.title.name}
            </h5>
            <ul className="text-sm flex flex-col gap-2">
              {footerLinks.intesrestLinks.links.map((item, index) => (
                <Link
                  onClick={handleScrollToTop}
                  to={item.link && item.link}
                  key={index}
                  className="hover:text-light-violet"
                >
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
          {/* END */}
        </div>
        <p className="text-sm sm:text-center gap-1 relative">
          Copyright © 2023 LIVEO | Todos los derechos reservados Diseño web por{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-ocean hover:text-light-violet"
            href={"https://www.dosbytes.com.mx/"}
          >
            dosbytes.com.mx
          </a>
        </p>
      </div>
    </div>
  );
};
