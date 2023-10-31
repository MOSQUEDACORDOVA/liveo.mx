import { useEffect } from "react";
import AOS from "aos";

export const useAOS = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
};
export const useAOSRefresh = () => {
  const handleRefresh = () => {
    AOS.refresh();
    AOS.init({ duration: 2000 });
  };
  return { handleRefresh };
};
