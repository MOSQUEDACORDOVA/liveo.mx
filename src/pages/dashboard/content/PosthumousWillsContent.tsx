import { Button } from "@/components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PathNames } from "@/config";
import { ListPosthumousWill } from "../components";

export const PosthumousWillsContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {location.pathname === PathNames.private.posthumous_wills && (
        <>
          <Button
            text="Nueva voluntad"
            bgColor="violet"
            uppercase
            onClick={() => navigate(PathNames.private.posthumous_wills_new)}
          />
          <ListPosthumousWill />
        </>
      )}
      <Outlet />
    </div>
  );
};
