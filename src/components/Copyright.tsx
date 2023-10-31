import { twMerge } from "tailwind-merge";

export const Copyright = ({ className }: { className?: string }) => {
  return (
    <span className={twMerge("text-white text-sm", className)}>
      Copyright © 2023 liveo. Todos los derechos reservados. Diseño web por
      <a href="https://www.dosbytes.com.mx/" rel="no-referrer" target="_blank">
        {" "}
        www.dosbytes.com.mx
      </a>
    </span>
  );
};
