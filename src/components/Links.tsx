import { Link } from "react-router-dom";
import { getLinks } from "@/data";
import { useNavBar } from "@/hook";
import { useSelector } from "react-redux";
import { selectDashboardProfile } from "@/features/LoginRegisterUser";

export const Links = (props: { row?: boolean; onClick?: () => void }) => {
  const { row, onClick } = props;
  const { path, handleActiveLink, isLogged } = useNavBar();
  const user = useSelector(selectDashboardProfile);
  const { roles } = user ?? {};

  const handleLinks = (index: number) => {
    onClick && onClick();
    handleActiveLink(index);
  };

  return (
    <ul className={`flex ${row && "flex-col"} my-2 gap-6 items-center`}>
      {getLinks(roles).map((item, index) => (
        <Link
          to={`${item.url}`}
          onClick={() => handleLinks(index)}
          key={index}
          className={`${
            item?.private
              ? item.private && isLogged
                ? path.includes(item.url)
                  ? "hidden"
                  : "hidden lg:block"
                : "hidden"
              : "block"
          }  text-xl font-semibold hover:text-light-violet ${
            item.url === path ? "text-light-violet" : "text-violet"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </ul>
  );
};
