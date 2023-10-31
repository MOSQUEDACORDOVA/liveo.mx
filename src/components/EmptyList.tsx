import { twMerge } from "tailwind-merge";

export const EmptyList = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-gray-400/80 font-medium text-xl", className)}>
      {message}
    </p>
  );
};
