import { ProfileHeader, CompaniesProfileTabs } from "../components";

export const CompaniesProfileContent = () => {
  return (
    <div className="w-full">
      <ProfileHeader title="Mi empresa" />
      <CompaniesProfileTabs />
    </div>
  );
};
