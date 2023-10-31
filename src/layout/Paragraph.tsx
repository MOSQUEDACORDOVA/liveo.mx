import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Paragraph = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const existTextSize = className?.includes("text-");
  return (
    <p
      className={twMerge(
        `${
          !existTextSize && "text-lg"
        } text-light-black font-semibold leading-5`,
        className
      )}
    >
      {children}
    </p>
  );
};
