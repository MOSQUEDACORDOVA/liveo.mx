import { LinksSideBar } from "@/components";

const Sidebar = () => {
  return (
    <div className="relative hidden lg:block shrink-0 left-0 h-[160vh] 2xl:h-[150vh] bg-light-gray">
      <LinksSideBar />
    </div>
  );
};

export default Sidebar;
