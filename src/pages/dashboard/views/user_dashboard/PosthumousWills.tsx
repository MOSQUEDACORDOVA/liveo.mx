/* eslint-disable react-hooks/exhaustive-deps */
import { useScrollToTop } from "@/hook";
import { PosthumousWillsContent } from "../../content";
import { useEffect } from "react";
import Sidebar from "@/components/dasboard/sidebar/sidebar";

export const PosthumousWills = () => {
  const { handleScrollToTop } = useScrollToTop();

  useEffect(() => handleScrollToTop(), []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-12 w-full">
        <PosthumousWillsContent />
      </div>
    </div>
  );
};
