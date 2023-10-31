import { useScrollToTop } from "@/hook";
import { useEffect } from "react";

export const CompaniesDashboard = () => {
  const { handleScrollToTop } = useScrollToTop();
  useEffect(() => handleScrollToTop(), []);
  return <div>CompaniesDashboard</div>;
};
