import { LinksSidebar } from "@/data";
import { Link, useLocation } from "react-router-dom";

export const LinksSideBar = ({ onClick }: { onClick?: () => void }) => {
  const path = useLocation().pathname;
  return (
    <ul className="flex flex-col gap-1 my-2 lg:mt-8">
      {LinksSidebar.map((item, index) => (
        <Link
          onClick={onClick}
          to={item.href}
          key={index}
          className={`${
            path.includes(item.href)
              ? "bg-light-violet text-white"
              : "hover:bg-light-violet hover:text-white text-violet lg:text-black"
          }  px-6 flex gap-4 p-3 items-center justify-start rounded-full lg:rounded-none`}
        >
          <i className="flex items-center">{item.icon}</i>
          <p className="text-lg font-semibold whitespace-nowrap">{item.name}</p>
        </Link>
      ))}
    </ul>
  );
};
