import { Button, Title } from "@/components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import logo from "@/assets/login-register/logo_login.png";
import wave from "@/assets/login-register/icon_login.png";
import { useNavigate } from "react-router-dom";
import { PathNames } from "@/config";

export const ReactiveAccount = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img src={wave} alt="logo" className="absolute left-0 top-0" />
      <img
        src={wave}
        alt="logo"
        className="absolute right-0 bottom-0 rotate-180"
      />
      <div className="h-screen relative z-10 bg-white/50 flex flex-col gap-6 justify-center items-center">
        <img src={logo} alt="logo" className="w-72 mb-10" />
        <CheckCircleIcon className="w-24 h-24 text-green-500" />
        <Title
          title="Su cuenta ha sido reactivada exitosamente, gracias por atendernos."
          Tag="h3"
          color="violet"
          className="md:w-1/2 text-center"
        />
        <Button
          onClick={() => navigate(PathNames.home)}
          text="ir a inicio"
          uppercase
          bgColor="light-violet"
          className="mt-10 text-lg px-8"
        />
      </div>
    </div>
  );
};
