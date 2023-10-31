import { Link } from "react-router-dom";
import { links } from "@/data";
import { useNavBar } from "@/hook";

export const Links = ({
  row,
  onClick,
}: {
  row?: boolean;
  onClick?: () => void;
}) => {
  const { path, handleActiveLink, isLogged } = useNavBar();

  const handleLinks = (index: number) => {
    onClick && onClick();
    handleActiveLink(index);
  };

  return (
    <ul className={`flex ${row && "flex-col"} my-2 gap-6 items-center`}>
      {links.map((item, index) => (
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
