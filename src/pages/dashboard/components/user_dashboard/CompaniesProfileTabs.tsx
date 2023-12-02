import { useState } from "react";
import { ITABSID, TABSID } from "@/utils";
import { useSelector } from "react-redux";
import {
  selectDashboardProfileActiveTab,
  selectDashboardProfileError,
  selectDashboardProfileLoading,
} from "@/features/LoginRegisterUser";
import CompaniesAccountTab from "@/components/profile/companies-account-tab/companies-account-tab";
import CompaniesServiceTab from "@/components/profile/companies-service-tab/companies-service-tab";
import CompaniesSocialMediaTab from "@/components/profile/companies-social-media-tab/companies-social-media-tab";
import { CompaniesFaqTab } from "@/components/profile/companies-faq-tab/companies-faq-tab";
import CompaniesLocationsTab from "@/components/profile/companies-locations-tab/companies-locations-tab";
import UserDocumentsTab from "@/components/profile/user-documents-tab/user-documents-tab";
import CompaniesImagesTab from "@/components/profile/companies-images-tab/companies-images-tab";
import { Suspense } from "@/layout";

const Tabs = [
  { name: "Mi empresa", tab: TABSID.ACCOUNT_PROFILE },
  { name: "Imagen", tab: TABSID.COMPANIE_IMAGEN },
  { name: "Servicios", tab: TABSID.VAULT },
  { name: "Redes sociales", tab: TABSID.AUT_PERSON_PROFILE },
  { name: "Ubicación", tab: TABSID.LOCATIONS_PROFIILE },
  { name: "Faq", tab: TABSID.FAQ_PROFILE },
] as const;

export const CompaniesProfileTabs = () => {
  const loadingUser = useSelector(selectDashboardProfileLoading);
  const errorUser = useSelector(selectDashboardProfileError);
  const activeTab = useSelector(selectDashboardProfileActiveTab);
  const [tab, setTab] = useState<ITABSID>(activeTab ?? TABSID.ACCOUNT_PROFILE);

  const handleTabs = (commingTab: ITABSID) => {
    setTab(commingTab);
  };

  const handleShowTabsContent = () => {
    if (tab === TABSID.ACCOUNT_PROFILE) return <CompaniesAccountTab />;
    if (tab === TABSID.COMPANIE_IMAGEN) return <CompaniesImagesTab />;
    if (tab === TABSID.DOCUMENTS_PROFILE) return <UserDocumentsTab />;
    if (tab === TABSID.VAULT) return <CompaniesServiceTab />;
    if (tab === TABSID.LOCATIONS_PROFIILE) return <CompaniesLocationsTab />;
    if (tab === TABSID.AUT_PERSON_PROFILE) return <CompaniesSocialMediaTab />;
    if (tab === TABSID.FAQ_PROFILE) return <CompaniesFaqTab />;
  };

  return (
    <div>
      <ul
        className={`flex items-center flex-wrap sm:flex-row space-x-4 sm:space-x-10 my-6 
      border-y border-light-gray`}
      >
        {Tabs.map((item, index) => (
          <li
            onClick={() => handleTabs(item.tab)}
            key={index}
            className={`${
              tab === item.tab
                ? "text-light-violet border-b-2 border-ocean"
                : "text-light-black hover:text-light-violet hover:border-b-2 hover:border-ocean"
            } duration-100 capitalize py-5 text-lg font-bold cursor-pointer`}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="">
        <Suspense
          loading={loadingUser}
          error={errorUser}
          errorMessage="No pudimos cargar su perfil"
          className="w-full pb-40 xl:pb-96 min-h-[100vh] overflow-y-auto"
        >
          {handleShowTabsContent()}
        </Suspense>
      </div>
    </div>
  );
};
