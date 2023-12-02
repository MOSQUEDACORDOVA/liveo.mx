/* eslint-disable @typescript-eslint/no-explicit-any */
import { useScrollToTop } from "@/hook";
import { Services, Vault, Welcome, WhyChoose } from "./components";
import { useEffect } from "react";

export const HomePage = () => {
  const { handleScrollToTop } = useScrollToTop();
  useEffect(() => handleScrollToTop(), []);

  return (
    <div className="overflow-hidden">
      {/* <Welcome /> */}
      {/* {/* <Services /> */}
      <Vault />
      {/* <WhyChoose /> */}
    </div>
  );
};
