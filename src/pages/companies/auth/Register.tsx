import { Copyright } from "@/components";
import { RegisterForm } from "..";

export const RegisterCompaniesPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col-reverse md:flex-row">
      <div className="bg-companies_register bg-no-repeat bg-cover w-full flex p-8">
        <Copyright className="self-end" />
      </div>
      <RegisterForm />
    </div>
  );
};
