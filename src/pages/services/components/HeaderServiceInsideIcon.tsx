import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const HeaderServiceInsideIcon = ({
  name,
  icon,
  not_love,
  iconJSX,
}: {
  name: string | undefined;
  icon?: string | undefined;
  iconJSX?: JSX.Element;
  not_love?: boolean;
}) => {
  return (
    <div className="flex gap-4 leading-6">
      {iconJSX ? (
        iconJSX
      ) : (
        <span className="shadow-light-black shadow-md rounded-full shrink-0 overflow-hidden p-2 w-20 h-20">
          <img src={icon} alt="service-icon" className="w-16 h-16  p-1.5" />
        </span>
      )}
      <span className="flex justify-center flex-col">
        <h5 className="font-bold">{name}</h5>
        {!not_love && (
          <p className="text-sm">
            Servicios{" "}
            <FavoriteBorderIcon className="text-sm text-light-black" />
          </p>
        )}
      </span>
    </div>
  );
};
