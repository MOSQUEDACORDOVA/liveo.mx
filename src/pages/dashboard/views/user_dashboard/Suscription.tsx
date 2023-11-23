/* eslint-disable react-hooks/exhaustive-deps */
import { useScrollToTop } from "@/hook";
import { SuscriptionContent } from "../../content";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/features/store";
import { Suspense } from "@/layout";
import { getBys, selectBysError, selectBysLoading } from "@/features/Service";
import Sidebar from "@/components/dasboard/sidebar/SideBar";

export const Suscription = () => {
  const loading = useSelector(selectBysLoading);
  const error = useSelector(selectBysError);
  const dispatch = useDispatch<AppDispatch>();
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => handleScrollToTop(), []);
  useEffect(() => {
    dispatch(getBys());
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <Suspense
        loading={loading}
        error={error}
        errorMessage="No pudimos cargar sus suscripciones"
        className="p-12 w-full"
      >
        <SuscriptionContent />
      </Suspense>
    </div>
  );
};
