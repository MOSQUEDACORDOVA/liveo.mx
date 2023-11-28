import { CompaniesProfileContent } from "../../content";
import { useSelector } from "react-redux";
import { selectDashboardProfile } from "@/features/LoginRegisterUser";
import { Suspense } from "@/layout";
import Sidebar from "@/components/dasboard/sidebar/sidebar";

export const CompaniesProfile = () => {
  const userInfo = useSelector(selectDashboardProfile);

  return (
    <div className="flex">
      <Sidebar />
      <Suspense
        errorMessage="No pudimos cargar su perfil"
        className="p-12 w-full"
      >
        {userInfo && <CompaniesProfileContent />}
      </Suspense>
    </div>
  );
};
