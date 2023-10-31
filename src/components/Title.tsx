type IProps = {
  Tag?: keyof JSX.IntrinsicElements;
  color?: "white" | "violet" | "light-violet" | "light-black" | "ocean";
  title: string;
  className?: string;
};

export const Title = ({ Tag = "h3", color, title, className }: IProps) => {
  return (
    <Tag
      className={`
    ${color === "white" && "text-white"}
    ${color === "violet" && "text-violet"}
    ${color === "light-violet" && "text-light-violet"}
    ${color === "light-black" && "text-light-black"}
    ${color === "ocean" && "text-ocean"}
    ${!color && "text-black"}
    font-bold leading-none
    ${className}
    `}
    >
      {title}
    </Tag>
  );
};
