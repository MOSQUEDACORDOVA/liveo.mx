import { FC, useState } from "react";
import { MenuDisplayProps as Props } from "./menu-display.types";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

const MenuDisplay: FC<Props> = (props) => {
  const { title, icon, items, focusOpen, classNameSubmenu } = props;
  const { colorIcon = "text-white", bgIcon = "bg-light-violet" } = props;

  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleSubMenuToggle = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };

  return (
    <div className="menu-display pb-4">
      <button
        onClick={handleSubMenuToggle}
        className={`flex items-center pt-2 px-4  transition duration-150 ease-in-out w-full rounded-2xl ${
          focusOpen && isSubMenuVisible && "bg-light-violet text-white"
        }`}
      >
        <div
          className={`flex items-center ${!icon && "justify-between w-full"}`}
        >
          {icon && (
            <div className={`mr-4 rounded-full p-3 ${colorIcon} ${bgIcon}`}>
              {icon}
            </div>
          )}
          <p className="text-lg">{title}</p>

          {isSubMenuVisible ? <ArrowDropUp /> : <ArrowDropDown />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 max-h-0 pl-16 ${
          isSubMenuVisible ? "max-h-screen" : ""
        }`}
      >
        {items?.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`block font-medium px-4 text-gray-400 ${classNameSubmenu}`}
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MenuDisplay;
