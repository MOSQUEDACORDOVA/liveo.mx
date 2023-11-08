import { PathNames } from "@/config";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import en_flag from "@/assets/flags/flag-us.png";
import es_flag from "@/assets/flags/flag-es.png";
import { useSelector } from "react-redux";
import { selectIsLogged } from "@/features/LoginRegisterUser";

export const TopHeader = () => {
  const isLogged = useSelector(selectIsLogged);

  return (
    <div className="flex gap-2 justify-between text-white items-center px-4 sm:px-8 py-2 text-sm bg-light-violet font-semibold cursor-default">
      <div className="flex gap-x-4 flex-wrap">
        <span className="flex gap-4">
          <img src={en_flag} alt="en_flag" className="w-6 cursor-pointer" />
          <img src={es_flag} alt="es_flag" className="w-6 cursor-pointer" />
        </span>
        <p className="hidden lg:block">
          ¡Estamos para ayudarte!{" "}
          <a
            href="tel:5541641512"
            className="hover:text-violet duration-200 whitespace-nowrap"
          >
            <PhoneIcon fontSize="small" className="rotate-[10deg] ml-1 -mt-1" />{" "}
            55 4163 4512
          </a>{" "}
          - Lunes a viernes de 8 a 17:30 horas
        </p>
      </div>
      {!isLogged && (
        <Link
          to={PathNames.companies}
          className="flex items-center gap-2 hover:text-violet duration-200"
        >
          <StoreIcon />
          <p>Acceso Proveedores</p>
        </Link>
      )}
    </div>
  );
};
