import { useSelector } from "react-redux";
import { selectSlidersError, selectSlidersLoading } from "@/features/HomeSlice";

import { Suspense } from "@/layout/Suspense";
import { Slider } from "@/components";

export const Welcome = () => {
  const error = useSelector(selectSlidersError);
  const loading = useSelector(selectSlidersLoading);

  return (
    <section className="h-[calc(100dvh-80px)] w-full relative bg-sideBar bg-full bg-no-repeat">
      <Suspense
        error={error}
        loading={loading}
        errorMessage="No se pudo cargar el slide"
      >
        <Slider />
      </Suspense>
    </section>
  );
};
