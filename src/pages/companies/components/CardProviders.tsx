import defaultImageCard from "@/assets/cards/proove_abogado+.png";
import defaultImageCardLogo from "@/assets/cards/logo_nurytanatologa.png";
import defaultCompaniesLogo from "@/assets/companies/+CLIENTES_ICON.png";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

type IProps = {
  icon?: JSX.Element;
  name: string;
  logo?: string | null;
  image?: string | null;
  category_name?: string | null;
  category_logo?: string | null;
  className?: string | null;
};

export const CardProviders = ({
  name,
  category_logo,
  category_name,
  image,
  logo,
  icon,
  className,
}: IProps) => {
  return (
    <div className="snap-start px-2 shrink-0 self-center cursor-pointer">
      <div
        className={`w-72 flex relative flex-col min-h-[350px] ml-1 shadow-md rounded-2xl overflow-hidden shadow-light-black bg-white ${className}`}
      >
        <div className="relative">
          <img
            src={image ?? defaultImageCard}
            alt="card_image"
            className="rounded-2xl w-full h-[145px] object-cover"
          />
          <img
            src={logo ?? defaultImageCardLogo}
            alt="card_logo"
            className="w-16 h-16 rounded-full absolute bottom-0 translate-x-1/2 shadow-md translate-y-1/2 bg-white object-cover"
          />
        </div>
        <div className="px-6 pt-12 pb-[50px]">
          <div className="flex items-start gap-2 h-full">
            <h5 className="leading-tight font-bold">{name}</h5>
            {icon ?? (
              <CheckCircleRoundedIcon className="text-blue-500 mt-0.5" />
            )}
          </div>
          <div className="absolute bottom-6 flex items-center gap-2">
            <img
              src={category_logo ?? defaultCompaniesLogo}
              alt="category_logo"
              className="w-10 h-10rounded-full p-1"
            />
            <h6 className="leading-tight text-sm pr-6">
              {category_name ?? "Ponga alguna categoría"}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
