import { IconButton } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useScrollToTop } from "@/hook";

export const ToTop = () => {
  const { handleScrollToTop, show } = useScrollToTop();

  return (
    <span
      className={`${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } text-white duration-300 fixed bottom-8 right-8 z-40`}
    >
      <IconButton
        onClick={handleScrollToTop}
        className={`text-white bg-light-violet/70 hover:bg-light-violet`}
      >
        <ExpandLessIcon fontSize="small" />
      </IconButton>
    </span>
  );
};
