import { selectServicesInfo } from "@/features/HomeSlice";
import { Paragraph } from "@/layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Sanitize } from ".";
import { PathNames } from "@/config";
import { useHandleStrings } from "@/hook";

export const PartOfServices = () => {
  const servicesInfo = useSelector(selectServicesInfo);
  const { handleBuildPath } = useHandleStrings();
  const isPair = (pair: number) => pair % 2 === 0;

  return (
    <ul className="grid md:grid-cols-2 gap-10 p-4 my-10 place-content-center xl:w-[80%] m-auto">
      {servicesInfo.map((item, index) => (
        <li
          data-aos="fade-up"
          key={index}
          className={`${
            isPair(index) ? "md:justify-end" : "md:justify-start"
          } flex flex-col sm:flex-row gap-4 group`}
        >
          <Link
            to={`${PathNames.services}/${handleBuildPath(item.name)}`}
            className={`${
              isPair(index) && "md:order-2"
            } shadow-lg shrink-0 rounded-2xl p-4 h-[120px] self-center flex items-center group-hover:-translate-y-1 duration-200`}
          >
            <img
              src={item.logo}
              alt={item.name}
              className="w-24 h-24 object-contain"
            />
          </Link>

          <span
            className={`${
              isPair(index) ? "md:order-1 md:text-right" : "md:text-left"
            } text-center lg:self-center`}
          >
            <Link to={""}>
              <h5 className="font-semibold text-black/80 group-hover:text-violet">
                {item.name}
              </h5>
            </Link>
            <Paragraph className="cursor-default">
              <Sanitize
                className="text-[16px] leading-3"
                html={item.shortDescription}
              />
            </Paragraph>
          </span>
        </li>
      ))}
    </ul>
  );
};
