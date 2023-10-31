/* eslint-disable react-hooks/exhaustive-deps */
import { useScrollToTop } from "@/hook";
import { SideBar } from "../../components";
import { PosthumousWillsContent } from "../../content";
import { useEffect } from "react";

export const PosthumousWills = () => {
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => handleScrollToTop(), []);

  return (
    <div className="flex">
      <SideBar />
      <div className="p-12 w-full">
        <PosthumousWillsContent />
      </div>
    </div>
  );
};
