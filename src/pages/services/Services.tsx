import {
  ChooseCards,
  Sanitize,
  SectionHeader,
  Testimonials,
} from "@/components";
import { PathNames } from "@/config";
import { selectServicesInfo } from "@/features/HomeSlice";
import { useHandleStrings, useScrollToTop } from "@/hook";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ServicesPage = () => {
  const servicesInfo = useSelector(selectServicesInfo);
  const isPair = (pair: number) => pair % 2 === 0;

  const { handleBuildPath } = useHandleStrings();
  const { handleScrollToTop } = useScrollToTop();
  useEffect(() => handleScrollToTop(), []);

  return (
    <div className="">
      <div className="mt-20 p-4 flex flex-col items-center gap-16 xl:my-20">
        {/* SERVICES */}
        <SectionHeader type="services" />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:w-[80%] gap-10">
          {servicesInfo.map((item, index) => (
            <Link
              onClick={handleScrollToTop}
              to={`${PathNames.services}/${handleBuildPath(item.name)}`}
              data-aos="fade-up"
              key={index}
              className="shadow-lg rounded-lg overflow-hidden group"
            >
              <div className="duration-200 hover:-translate-y-1">
                <div
                  className={`w-full h-[140px] flex justify-center items-center p-4 ${
                    isPair(index) ? "bg-ocean/5" : "bg-violet/5"
                  }`}
                >
                  <img
                    src={item.imgPrincipal}
                    alt={item.name}
                    className="w-20"
                  />
                </div>
                <div className="p-4 flex flex-col gap-4 text-center sm:text-left justify-center items-center">
                  <p className="font-bold text-2xl">{item.name}</p>
                  <p className="text-sm text-black/70 font-semibold">
                    <Sanitize html={item.shortDescription} />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </ul>
        {/* END */}
      </div>
      <div className="bg-light-gray w-full flex flex-col items-center justify-center py-16 my-10">
        <SectionHeader type="why-choose-us" />
        <ChooseCards />
      </div>
      <Testimonials />
    </div>
  );
};
