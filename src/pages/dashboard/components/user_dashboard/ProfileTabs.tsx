import { useState } from "react";
import { AccountTab, AuthPersonTab, DocumentTab, VaultTab } from ".";
import { ITABSID, TABSID } from "@/utils";
import { useSelector } from "react-redux";
import { selectDashboardProfileActiveTab } from "@/features/LoginRegisterUser";

const Tabs = [
  { name: "Mi cuenta", tab: TABSID.ACCOUNT_PROFILE },
  { name: "Documentos", tab: TABSID.DOCUMENTS_PROFILE },
  { name: "Mi bóveda", tab: TABSID.VAULT },
  { name: "Personas autorizadas", tab: TABSID.AUT_PERSON_PROFILE },
] as const;

export const ProfileTabs = () => {
  const activeTab = useSelector(selectDashboardProfileActiveTab);
  const [tab, setTab] = useState<ITABSID>(activeTab ?? TABSID.ACCOUNT_PROFILE);

  const handleTabs = (commingTab: ITABSID) => {
    setTab(commingTab);
  };

  const handleShowTabsContent = () => {
    if (tab === TABSID.ACCOUNT_PROFILE) return <AccountTab />;
    if (tab === TABSID.DOCUMENTS_PROFILE) return <DocumentTab />;
    if (tab === TABSID.VAULT) return <VaultTab />;
    if (tab === TABSID.AUT_PERSON_PROFILE) return <AuthPersonTab />;
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
      <div className="">{handleShowTabsContent()}</div>
    </div>
  );
};
