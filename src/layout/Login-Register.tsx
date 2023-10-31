import ribbon from "@/assets/login-register/icon_login.png";
import logo from "@/assets/login-register/logo_login.png";

export const LoginRegister = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="shadow-lg rounded-2xl w-[90%] sm:w-[530px] overflow-hidden relative flex flex-col items-center px-6 py-10 gap-6">
      <img src={ribbon} alt="ribbon" className="w-1/4 absolute inset-0" />
      <img src={logo} alt="logo" className="w-40 relative" />
      <div className="relative flex flex-col items-center text-center">
        <h4 className="font-bold text-light-violet">{title}</h4>
        <small className="text-sm font-semibold text-black/50">
          {subtitle}
        </small>
      </div>
      {children}
    </div>
  );
};
