/* eslint-disable react-hooks/exhaustive-deps */
import { useScrollToTop } from "@/hook";
import { ProfileContent } from "../../content";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/features/store";
import {
  getUserProfile,
  selectDashboardProfile,
  selectDashboardProfileError,
  selectDashboardProfileLoading,
  selectLoginInfo,
} from "@/features/LoginRegisterUser";
import { Suspense } from "@/layout";
import { TOKEN } from "@/config";
import Sidebar from "@/components/dasboard/sidebar/sidebar";

export const Profile = () => {
  const loadingUser = useSelector(selectDashboardProfileLoading);
  const LoginInfo = useSelector(selectLoginInfo);
  const errorUser = useSelector(selectDashboardProfileError);
  const userInfo = useSelector(selectDashboardProfile);
  const dispatch = useDispatch<AppDispatch>();
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => handleScrollToTop(), []);
  useEffect(() => {
    !LoginInfo && dispatch(getUserProfile(TOKEN));
  }, []);

  return (
    <div className="flex mb-40 lg:mb-20">
      <Sidebar />
      <Suspense
        loading={loadingUser}
        error={errorUser}
        errorMessage="No pudimos cargar su perfil"
        className="p-12 w-full"
      >
        {userInfo && <ProfileContent />}
      </Suspense>
    </div>
  );
};
