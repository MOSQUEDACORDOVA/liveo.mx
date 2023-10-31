import CircleIcon from "@mui/icons-material/Circle";

export const Dots = ({
  qty,
  color,
  onClick,
  className,
  positionActive,
}: {
  qty: any[];
  color?: string;
  onClick: (item: number) => void;
  className?: string;
  positionActive?: number;
}) => {
  return (
    <div className={`${className} flex gap-1 justify-center items-center`}>
      {qty.map((_, index) => (
        <span
          key={index}
          onClick={() => onClick(index)}
          className={`${
            positionActive === index && "text-violet"
          } cursor-pointer`}
        >
          <CircleIcon style={{ color: color }} className="text-xs" />
        </span>
      ))}
    </div>
  );
};
