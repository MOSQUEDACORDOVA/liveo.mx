import {
  ServiceData,
  SlidersData,
  TestimonialsData,
} from "@/features/HomeSlice";
import { AppDispatch } from "@/features/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useHomeData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(TestimonialsData());
    dispatch(SlidersData());
    dispatch(ServiceData());
  }, []);
};
