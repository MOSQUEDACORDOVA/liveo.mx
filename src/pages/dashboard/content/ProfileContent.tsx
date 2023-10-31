import { ProfileHeader, ProfileTabs } from "../components";

export const ProfileContent = () => {
  return (
    <div className="w-full">
      <ProfileHeader title="Mi perfil" />
      <ProfileTabs />
    </div>
  );
};
