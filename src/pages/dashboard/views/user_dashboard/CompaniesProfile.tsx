import { CompaniesProfileContent } from "../../content";
import { useSelector } from "react-redux";
import {
  selectDashboardProfile,
  selectDashboardProfileError,
  selectDashboardProfileLoading,
} from "@/features/LoginRegisterUser";
import { Suspense } from "@/layout";
import Sidebar from "@/components/dasboard/sidebar/sidebar";

export const CompaniesProfile = () => {
  const loadingUser = useSelector(selectDashboardProfileLoading);
  const errorUser = useSelector(selectDashboardProfileError);
  const userInfo = useSelector(selectDashboardProfile);

  return (
    <div className="flex">
      <Sidebar />
      <Suspense
        loading={loadingUser}
        error={errorUser}
        errorMessage="No pudimos cargar su perfil"
        className="p-12 w-full"
      >
        {userInfo && <CompaniesProfileContent />}
      </Suspense>
    </div>
  );
};
