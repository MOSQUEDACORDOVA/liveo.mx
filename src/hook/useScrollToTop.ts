import { useMemo, useState } from "react";

export const useScrollToTop = () => {
  const [show, setShow] = useState(false);
  useMemo(() => {
    const handleScroll = () => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          return setShow(true);
        }
        return setShow(false);
      });
    };
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return { show, handleScrollToTop };
};
