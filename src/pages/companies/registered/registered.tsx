import { Copyright } from "@/components";
import RegisteredForm from "@/components/companies/registered-form/registered-form";

export const RegisterCompaniesPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col-reverse md:flex-row">
      <div className="bg-companies_register bg-no-repeat bg-cover w-full flex p-8">
        <Copyright className="self-end" />
      </div>
      <RegisteredForm />
    </div>
  );
};

export default RegisterCompaniesPage;
