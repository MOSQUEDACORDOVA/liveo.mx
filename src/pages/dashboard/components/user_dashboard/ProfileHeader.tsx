import {
  getActivateAccount,
  selectDashboardProfile,
} from "@/features/LoginRegisterUser";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import UnpublishedRoundedIcon from "@mui/icons-material/UnpublishedRounded";
import { Paragraph } from "@/layout";
import { Tooltip } from "@mui/material";
import { AppDispatch } from "@/features/store";

export const ProfileHeader = ({ title }: { title: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector(selectDashboardProfile);

  const handleActiveAccount = () =>
    userInfo?.vivo === 0 && dispatch(getActivateAccount());

  return (
    <div className="flex justify-between gap-4 flex-wrap-reverse">
      <div className="">
        <h4 className="text-violet font-bold">{title}</h4>
        <div className="flex gap-2 text-lg">
          <b className="">
            {userInfo?.name} {userInfo?.apellido},
          </b>
          <p className="text-light-black font-semibold">{userInfo?.email}</p>
        </div>
      </div>
      <Tooltip title={"Si su cuenta está inactiva, click aquí"}>
        <button
          onClick={handleActiveAccount}
          className="flex items-center gap-2 text-sm h-fit p-2 pl-0"
        >
          {userInfo?.vivo === 1 ? (
            <>
              <CheckCircleRoundedIcon className="w-8 h-8 text-green-600/70" />
              <Paragraph children={`Cuenta activa`} />
            </>
          ) : (
            <>
              <UnpublishedRoundedIcon className="w-8 h-8 text-red-600/70" />
              <Paragraph children={`Confirmar supervivencia`} />
            </>
          )}
        </button>
      </Tooltip>
    </div>
  );
};
