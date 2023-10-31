import React from "react";
import { twMerge } from "tailwind-merge";

export const Single70PercentPage = ({
  children,
  className,
}: {
  children: React.ReactNode | JSX.Element;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "xl:w-[70%] sm:pb-72 min-h-screen p-8 mx-auto flex flex-col gap-10",
        className
      )}
    >
      {children}
    </div>
  );
};
